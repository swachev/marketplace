import React, {useState} from 'react';
import './PaymentCards.css';
import {Button, Col, Dropdown, Menu, notification, Row} from "antd";
import AddPaymentCards from "./AddPaymentCards";
import Cards from "react-credit-cards";
import {addUserCard, deleteUserCard} from "../../util/APIUtils";
import {isSame, makeExpiry, UserException} from "../../util/Helpers";
import {APP_NAME, UIMessages} from "../../constants";

import {connect} from 'react-redux';
import {
    handleAddPaymentCards,
    handleDeletePaymentCards,
    handleUpdatePaymentCards
} from "../../store/actions";

const PaymentCards = (props) => {
    const paymentState = {
        visible: false,
        confirmLoading: false,
        editMode: false,
        editedCard: {},
        targeted: null,
    };
    const [state, setState] = useState(paymentState);

    const handleMenuClick = (e) => {
        const {targeted} = e.item.props;
        switch (e.item.props.children) {
            case ('Edit'):
                const value = {
                    ...state,
                    editMode: true,
                    visible: true,
                    editedCard: props.paymentCards[targeted],
                    targeted: targeted
                };
                setState(value);
                break;
            case ('Delete'):
                deleteCard(targeted);
                break;
            default:
                break;
        }
    };
    const deleteCard = (targeted) => {
        const cards = [...props.paymentCards];
        const action = {
            type: 'Delete',
            message: ''
        };
        deleteUserCard(cards[targeted].id)
            .then(response => {
                if (response.success) {
                    const value = {
                        paymentCards: [...cards.filter(value => value !== cards[targeted])]
                    };
                    props.handleDeletePaymentCards(value.paymentCards);
                    action.message = response.message;
                }
                notify(action);
            })
            .catch(error => {
                action.type = 'Error';
                notify(action);
            })

    };
    const showModal = () => {
        const value = {
            ...state,
            editMode: false,
            visible: true
        };
        setState(value);
    };
    const handleShowLoading = () => {
        const value = {
            ...state,
            confirmLoading: true
        };
        setState(value);
    };
    const handleHideLoading = () => {
        const value = {
            ...state,
            editedCard: {},
            targeted: null,
            confirmLoading: false

        };
        setState(value);
    };
    const handleCancel = () => {
        const value = {
            ...state,
            editMode: false,
            visible: false
        };
        setState(value);
    };
    const handleNewCard = async (card) => {
        const cards = [...props.paymentCards];
        const action = {
            type: 'Add/Update',
            data: card,
            message: '',
            continue: true,
        };
        for (let i in cards) {
            if (cards.hasOwnProperty(i) && action.continue) {
                if (isSame(card.data, cards[i], false, card.inEdit)) {
                    action.continue = false;
                    action.type = "Duplicate";
                }
                if (!card.inEdit && (card.data.number === cards[i].number)) {
                    action.continue = false;
                    action.type = "Duplicate number";
                }
                if (card.inEdit &&
                    (card.data.id !== cards[i].id) && (card.data.number === cards[i].number)) {
                    action.continue = false;
                    action.type = "Duplicate number";
                }
            }
        }
        if (action.continue) {
            return addUserCard(card.data)
                .then(response => {
                    if (response.status === 201) {
                        const ca = {...card.data};
                        if (!card.inEdit) {
                            ca.id = response.id;
                            cards.push(ca);
                            props.handleAddPaymentCards([...cards]);
                        } else {
                            cards[card.targeted] = card.data;
                            props.handleUpdatePaymentCards([...cards]);
                        }
                        action.message = response.message;
                    }
                    notify(action);
                    return response.success;

                })
                .catch(error => {
                    if(error.status === 500) {
                        action.message = error.error;
                        action.type = 'Error';
                        notify(action);
                        throw new UserException('Error', 'Error');
                    }
                })
        } else {
            notify(action);
            throw new UserException('Duplicate', 'Error');
        }
    };
    const notify = (action = {}) => {
        switch (action.type) {
            case 'Add/Update':
                if (action.data.inEdit) {
                    notification.success({
                        message: APP_NAME,
                        description: UIMessages.paymentCards.update
                    });
                } else {
                    notification.success({
                        message: APP_NAME,
                        description: UIMessages.paymentCards.add
                    });
                }
                break;
            case 'Delete':
                notification.success({
                    message: APP_NAME,
                    description: action.message !== '' ? action.message : UIMessages.paymentCards.delete
                });
                break;
            case 'Duplicate':
                notification.error({
                    message: APP_NAME,
                    description: UIMessages.paymentCards.duplicate
                });
                break;
            case 'Duplicate number':
                notification.error({
                    message: APP_NAME,
                    description: UIMessages.paymentCards.duplicateNumber
                });
                break;
            case 'Error':
                notification.error({
                    message: APP_NAME,
                    description: action.message || action.message !== '' ? action.message : UIMessages.paymentCards.error
                });
                break;
            default:
                break;
        }
    };
    const setMenu = (v) => {
        return <Menu onClick={handleMenuClick}>
            <Menu.Item targeted={v} key="1">
                Edit
            </Menu.Item>
            <Menu.Item targeted={v} key="2">
                Delete
            </Menu.Item>
        </Menu>
    };
    const {visible, confirmLoading, editMode, editedCard, targeted} = state;
    return (
        <div className="payment">
            <div className="payment-types">
                <Button type="primary"
                        onClick={showModal}
                        className="payment-button">aAdd Payment Card</Button>
                <AddPaymentCards
                    edit={{editMode: editMode, showModal: visible, data: editedCard, targeted: targeted}}
                    showLoading={handleShowLoading}
                    hideLoading={handleHideLoading}
                    hideModal={handleCancel}
                    confirmLoading={confirmLoading}
                    visible={visible}
                    onCancel={handleCancel}
                    send={(card) => handleNewCard(card)}
                />
                {
                    props.paymentCards.map((card, index) => {
                        return (<label key={index}>
                                <Row
                                    className={"evi-mt-1 l-card"}
                                    gutter={4}
                                >
                                    <Col span={12}>
                                        <Cards
                                            cvc={''}
                                            expiry={makeExpiry(card.expMonth, card.expYear)}
                                            name={card.name}
                                            number={card.number}
                                            focused={'number'}
                                            locale={{valid: 'Expires'}}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Dropdown overlay={setMenu(index)}>
                                            <Button style={{
                                                marginLeft: '13.5rem',
                                                marginTop: '-1rem'
                                            }} type={"secondary"}>
                                                ...
                                            </Button>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </label>
                        )
                    })
                }
            </div>
        </div>
    );

};
const mapStateToProps = state => {
    return {
        paymentCards: state.loggedUser.paymentCards
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleAddPaymentCards: (value) => dispatch(handleAddPaymentCards(value)),
        handleUpdatePaymentCards: (value) => dispatch(handleUpdatePaymentCards(value)),
        handleDeletePaymentCards: (value) => dispatch(handleDeletePaymentCards(value)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentCards);
