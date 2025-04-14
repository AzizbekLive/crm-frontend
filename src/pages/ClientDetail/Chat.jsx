import { Link } from 'feather-icons-react/build/IconComponents';
import React from 'react';
import { Button, Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, UncontrolledDropdown } from 'reactstrap';
import avatar from '../../assets/images/users/avatar-1.jpg';
import { messages } from './data';
import SimpleBar from 'simplebar-react';

const Chat = () => {
    return (
        <div className="user-chat w-100 overflow-hidden">
            <div className="chat-content d-lg-flex">
                <div className="w-100 overflow-hidden position-relative">
                    <div className="position-relative">
                        <div className="position-relative" id="users-chat">
                            <SimpleBar
                                className="chat-conversation p-3 p-lg-4"
                                id="chat-conversation"
                                // containerRef={(ref) => setMessageBox(ref)}
                            >
                                <div id="elmLoader"></div>
                                {messages.length > 0 ? (
                                    <ul className="list-unstyled chat-conversation-list" id="users-conversation">
                                        {messages.map((message, key) => (
                                            <li className={message.sender === 'Chat_Box_Username' ? ' chat-list left' : 'chat-list right'} key={key}>
                                                <div className="conversation-list">
                                                    {message.sender === 'Chat_Box_Username' && (
                                                        <div className="chat-avatar">
                                                            {/* {Chat_Box_Image === undefined ? (
                                                            <img src={userDummayImage} alt="" />
                                                        ) : (
                                                            <img src={Chat_Box_Image} alt="" />
                                                            )} */}
                                                            <img src={avatar} alt="" />
                                                        </div>
                                                    )}

                                                    <div className="user-chat-content">
                                                        <div className="ctext-wrap">
                                                            <div className="ctext-wrap-content">
                                                                <p className="mb-0 ctext-content text-dark">{message.message}</p>
                                                            </div>
                                                            <UncontrolledDropdown className="align-self-start message-box-drop">
                                                                <DropdownToggle href="#" className="btn nav-btn" tag="i">
                                                                    <i className="ri-more-2-fill"></i>
                                                                </DropdownToggle>
                                                                <DropdownMenu>
                                                                    <DropdownItem href="#" className="reply-message">
                                                                        <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                                                        Reply
                                                                    </DropdownItem>
                                                                    <DropdownItem href="#">
                                                                        <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                                                        Forward
                                                                    </DropdownItem>
                                                                    <DropdownItem href="#">
                                                                        <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
                                                                        Copy
                                                                    </DropdownItem>
                                                                    <DropdownItem href="#">
                                                                        <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                                                        Bookmark
                                                                    </DropdownItem>
                                                                    <DropdownItem href="#">
                                                                        <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                                                        Delete
                                                                    </DropdownItem>
                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        </div>
                                                        <div className="conversation-name">
                                                            <small className="text-muted time">09:07 am</small>{' '}
                                                            <span className="text-success check-message-icon">
                                                                <i className="ri-check-double-line align-bottom"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="py-5 text-center fs-4">No messages here yet</div>
                                )}
                            </SimpleBar>
                            <div
                                className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show "
                                id="copyClipBoard"
                                role="alert">
                                Message copied
                            </div>
                        </div>

                        <div className="chat-input-section p-3 p-lg-4">
                            <form id="chatinput-form">
                                <Row className="g-0 align-items-center">
                                    <div className="col-auto">
                                        <div className="chat-input-links me-2">
                                            <div className="links-list-item">
                                                <button
                                                    type="button"
                                                    className="btn btn-link text-decoration-none emoji-btn"
                                                    id="emoji-btn"
                                                    // onClick={() => setemojiPicker(!emojiPicker)}
                                                >
                                                    <i className="bx bx-smile align-middle"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="chat-input-feedback">Please Enter a Message</div>
                                        <input
                                            type="text"
                                            // value={curMessage}
                                            // onKeyPress={onKeyPress}
                                            // onChange={(e) => setcurMessage(e.target.value)}
                                            className="form-control chat-input bg-light border-light"
                                            id="chat-input"
                                            placeholder="Type your message..."
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <div className="chat-input-links ms-2">
                                            <div className="links-list-item">
                                                <Button
                                                    type="button"
                                                    color="success"
                                                    // onClick={() => {
                                                    //     addMessage(currentRoomId, currentUser.name);
                                                    //     setemojiPicker(false);
                                                    //     setemojiArray('');
                                                    // }}
                                                    className="chat-send waves-effect waves-light">
                                                    <i className="ri-send-plane-2-fill align-bottom"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </form>
                        </div>

                        {/* <div className={reply ? 'replyCard show' : 'replyCard'}> */}
                        <div className={'replyCard'}>
                            <Card className="mb-0">
                                <CardBody className="py-3">
                                    <div className="replymessage-block mb-0 d-flex align-items-start">
                                        <div className="flex-grow-1">
                                            {/* <h5 className="conversation-name">{reply && reply.sender}</h5> */}
                                            {/* <p className="mb-0">{reply && reply.message}</p> */}
                                        </div>
                                        <div className="flex-shrink-0">
                                            <button
                                                type="button"
                                                id="close_toggle"
                                                className="btn btn-sm btn-link mt-n2 me-n3 fs-18"
                                                onClick={() => setreply('')}>
                                                <i className="bx bx-x align-middle"></i>
                                            </button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
