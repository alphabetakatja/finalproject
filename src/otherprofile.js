import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profilepic";
// import { FriendshipButton } from "./friendship-button";
import { MentorshipButton } from "./mentorship-button";
// import { Wall } from "./wall";
import { PrivateChat } from "./private-chat";
import { socket } from "./socket";

// <FriendshipButton
//     otherId={this.props.match.params.id}
// />

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("this.props.match: ", this.props);
        socket.emit("load profile", {
            receiver_id: this.props.match.params.id
        });
        console.log("this.props.match.params.id: ", this.props.match.params.id);
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then(({ data }) => {
                console.log("data in user/:id get request: ", data);
                if (
                    this.props.match.params.id == data.loggedInUser ||
                    data.success == false
                ) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        first: data.otherUserData.first,
                        last: data.otherUserData.last,
                        imageUrl: data.otherUserData.url,
                        bio: data.otherUserData.bio,
                        email: data.otherUserData.email,
                        linkedin: data.otherUserData.linkedin,
                        github: data.otherUserData.github,
                        mentor: data.otherUserData.mentor,
                        taken: data.otherUserData.taken,
                        id: data.otherUserData.id
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <div className="profile-name">
                    <h2>
                        {this.state.first} {this.state.last}
                    </h2>
                </div>
                <div className="profile-layout">
                    <div className="profile-container">
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            imageUrl={this.state.imageUrl}
                            profilePicClass="big-profile"
                        />
                        {this.state.mentor == false && (
                            <div className="role">
                                <p>MENTEE</p>
                            </div>
                        )}
                        {this.state.mentor == true && (
                            <div className="role">
                                <p>MENTOR</p>
                            </div>
                        )}
                        <div className="friendship-button">
                            <MentorshipButton
                                otherId={this.props.match.params.id}
                                mentor={this.props.mentor}
                                otherUserStatus={this.state.mentor}
                                taken={this.state.taken}
                            />
                        </div>
                        <div className="bio-editor">
                            <p>{this.state.bio}</p>
                        </div>
                    </div>

                    <div className="profile-editor">
                        <h3>Profile</h3>
                        <ul>
                            <li>
                                <div className="icon">
                                    <img
                                        className="profile-icon"
                                        src="/./images/email.png"
                                    />
                                </div>
                                <a className="new-line">
                                    <p>{this.state.email}</p>
                                </a>
                            </li>
                            <li>
                                <div className="icon">
                                    <img
                                        className="profile-icon"
                                        src="/./images/linkedin.png"
                                    />
                                </div>
                                <a
                                    className="new-line"
                                    href={this.state.linkedin}
                                >
                                    <p>{this.state.linkedin}</p>
                                </a>
                            </li>
                            <li>
                                <div className="icon">
                                    <img
                                        className="profile-icon"
                                        src="/./images/github-logo.png"
                                    />
                                </div>
                                <a
                                    className="new-line"
                                    href={this.state.github}
                                >
                                    <p className="new-line">
                                        {this.state.github}
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <PrivateChat receiverId={this.props.match.params.id} />
                </div>
            </div>
        );
    }
}
