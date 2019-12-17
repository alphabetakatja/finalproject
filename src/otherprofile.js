import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profilepic";
import { FriendshipButton } from "./friendship-button";
import { MentorshipButton } from "./mentorship-button";
// import { Wall } from "./wall";
// import { socket } from "./socket";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("this.props.match: ", this.props);
        // socket.emit("load profile", {
        //     receiver_id: this.props.match.params.id
        // });
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
                        mentor: data.otherUserData.mentor,
                        taken: data.otherUserData.taken
                    });
                }
            });
    }

    render() {
        return (
            <div className="profile-container">
                <div className="profile-info">
                    <div className="profile-name">
                        <h2>
                            {this.state.first} {this.state.last}
                        </h2>
                    </div>
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                        profilePicClass="big-profile"
                    />
                    <div className="user-info">
                        <div className="profile-editor">{this.state.bio}</div>
                        <div className="friendship-button">
                            <FriendshipButton
                                otherId={this.props.match.params.id}
                            />
                            <MentorshipButton
                                otherId={this.props.match.params.id}
                                mentor={this.props.mentor}
                                otherUserStatus={this.state.mentor}
                                taken={this.state.taken}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
