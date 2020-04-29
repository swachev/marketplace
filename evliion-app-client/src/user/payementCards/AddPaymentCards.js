import React, {useState} from 'react';
import {Form, Input, Modal} from 'antd';
import Cards from 'react-credit-cards';
import './AddPaymentCard.css';
import 'react-credit-cards/es/styles-compiled.css';
import {CARD, CARD_EXPIRY, CARD_NUMBER, OWNER_CARD, paymentCards} from "../../constants";
import {arrayThis, IsThisDateExpiry, makeExpiry, onlyKeyName} from "../../util/Helpers";
import Payment from 'payment';

const AddPaymentCards = (props) => {
    const FormItem = Form.Item;
    const [cardState, setCardState] = useState({
        'Owner card': {
            value: '',
            validation: {
                required: true,
            },
            valid: false
        },
        'Card number': {
            value: '',
            validation: {
                required: true,
                supportedCard: [...onlyKeyName(paymentCards)],
                min: 16,
                max: 19
            },
            valid: false
        },
        'Card expiry': {
            value: '',
            validation: {
                required: true,
                format: true,
                max: 7,
            },
            valid: false
        },
        cardType: '',
        strictValid: false,
        formIsValid: false,
        focused: '',
        okText: 'Add',
        nowInEdit: false,
        id: null,
        targeted:null
    });
    const handleInputFocus = (e) => {
        setCardState({...cardState, focus: e.target.name});
    };
    const validateValue = async (here, value) => {
        const rules = cardState[here].validation;
        let isValid = true;
        const isEmpty = value.trim() === '';
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.min) {
            isValid = value.length >= rules.min && isValid;
        }
        if (rules.max) {
            isValid = value.length <= rules.max && isValid;
        }
        if (rules.format) {
            const date = new Date(value.slice(3), value.split('/')[0] - 1);
            isValid = value.charAt(2) === '/' &&
                value.slice(3).length >= 2 && date.getMonth() &&
                date.getFullYear() && !IsThisDateExpiry(date) &&
                isValid;
        }
        if (rules.supportedCard) {
            isValid = rules.supportedCard.includes(cardState.cardType) && isValid;
        }
        if(isEmpty) {
            return  {
                value: value,
                valid: isValid,
                validateStatus: null,
                errorMsg: null
            }
        } else {
            return isValid ? {
                value: value,
                valid: isValid,
                validateStatus: 'success',
                errorMsg: null
            } : {
                value: value,
                valid: isValid,
                validateStatus: 'error',
                errorMsg: `Please check the ${here}`
            };
        }

    };
    const sureIsValid = (newCardState) => {
        let formIsValid = true;
        for (let i in newCardState) {
            if (newCardState.hasOwnProperty(i) && CARD.includes(i)) {
                formIsValid = newCardState[i].valid && formIsValid;
            }
        }
        newCardState.formIsValid = formIsValid;
        setCardState(newCardState);
    };
    const handlePaymentCardChange = (e, here) => {
        Payment.formatCardExpiry(document.querySelector('[name="Card expiry"]'));
        let {value} = e.target;
        value = value.split(' ').join('');
        const newCardState = {...cardState};
        validateValue(here, value).then(response => {
            newCardState[here] = {
                ...newCardState[here],
                ...response
            };
        }).finally(() => sureIsValid(newCardState));
    };
    const setCardType = (value, valid) => {
        const cs = {...cardState};
        cs.cardType = value.issuer;
        cs.strictValid = valid;
        setCardState(cs);
    };
    if (props.edit.editMode && cardState.nowInEdit === false) {
        const data = props.edit.data;
        if (data.id) {
            const state = {...cardState};
            state[OWNER_CARD].value = data.name;
            state[CARD_NUMBER].value = data.number.replace(/\s/g, '');
            state[CARD_EXPIRY].value = makeExpiry(data.expMonth, data.expYear);
            /* state.cardType = data.type,*/
            state.nowInEdit = true;
            state[OWNER_CARD].valid = true;
            state[CARD_NUMBER].valid = true;
            state[CARD_EXPIRY].valid = true;
            state.formIsValid = true;
            state.id = data.id;
            state.targeted = props.edit.targeted;
            state.okText = 'Update';
            setCardState(state);
        }
    }
    const invalidateCard = () => {
        const state = {...cardState};
        state[OWNER_CARD].value = '';
        state[OWNER_CARD].valid = false;
        state[OWNER_CARD].validateStatus = null;
        state[OWNER_CARD].errorMsg = null;
        state[CARD_NUMBER].value = '';
        state[CARD_NUMBER].valid = false;
        state[CARD_NUMBER].validateStatus = null;
        state[CARD_NUMBER].errorMsg = null;
        state[CARD_EXPIRY].value = '';
        state[CARD_EXPIRY].valid = false;
        state[CARD_EXPIRY].validateStatus = null;
        state[CARD_EXPIRY].errorMsg = null;
        state.cardType = '';
        state.focused = '';
        state.strictValid = false;
        state.formIsValid = false;
        state.id = null;
        state.targeted = null;
        state.okText = 'Add';
        state.nowInEdit = false;
        setCardState(state);
    };
    const submitTheCard = () => {
        if (cardState.formIsValid) {
            const expiry = cardState[CARD_EXPIRY].value.split('/');
            const card = {
                data: {
                    name: cardState[OWNER_CARD].value,
                    number: cardState[CARD_NUMBER].value,
                    expMonth: expiry[0],
                    expYear: expiry[1],
                },
                inEdit: cardState.nowInEdit,
                targeted: cardState.targeted
            };
            if(cardState.id) {
                card.data.id = cardState.id;
            }
            props.showLoading();
            setCardState({
                ...cardState,
                okText: 'Submitting ...'
            });
            //simulate async task
            setTimeout(() => {
                props.send(card)
                    .then(resp => {
                        if (resp) {
                            props.hideLoading();
                            props.hideModal();
                            invalidateCard();
                        }
                    }).catch(error => {
                    if (error.message) {
                        props.hideLoading();
                        setCardState({
                            ...cardState,
                            formIsValid: false,
                            okText: props.edit.editMode ?
                                'Update' : 'Add'
                        });
                    }
                });
            }, 1000);
        }
    };
    const resetThis = () => {
        invalidateCard();
        props.onCancel();
    };
    return (
        <div>
            <Modal
                title={props.edit.editMode ? 'Update payment card' : 'Add payment cards'}
                confirmLoading={props.confirmLoading}
                visible={props.visible}
                onCancel={resetThis}
                okText={cardState.okText}
                okButtonProps={{disabled: !cardState.formIsValid}}
                onOk={submitTheCard}>
                <div id="PaymentForm">
                    <Cards
                        cvc={''}
                        expiry={cardState[CARD_EXPIRY].value}
                        focused={cardState.focused}
                        name={cardState[OWNER_CARD].value}
                        number={cardState[CARD_NUMBER].value}
                        callback={(value, valid) => setCardType(value, valid)}
                    />
                    <form className={"all-center"}>
                        {arrayThis(cardState).map(el => {
                            return CARD.includes(el.id) ? <label key={el.id}>
                                <FormItem validateStatus={el.data.validateStatus}
                                          help={el.data.errorMsg}>
                                    <Input
                                        placeholder={`Enter ${el.id}`}
                                        style={{fontSize: '16px'}}
                                        name={el.id}
                                        value={el.data.value}
                                        onFocus={handleInputFocus}
                                        onChange={(e) => handlePaymentCardChange(e, el.id)}
                                    />
                                </FormItem>
                            </label> : null
                        })}
                    </form>
                </div>
            </Modal>
        </div>
    )
};

export default AddPaymentCards;
