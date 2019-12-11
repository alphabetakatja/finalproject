import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profilepic";
import { FriendshipButton } from "./friendship-button";
import { Wall } from "./wall";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        // it comes from the BrowserRouter
        console.log("this.props.match: ", this.props.match);

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
                        bio: data.otherUserData.bio
                    });
                }
            });
    }

    render() {
        return (
            <div className="profile-container">
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.imageUrl}
                    profilePicClass="big-profile"
                />
                <div className="user-info">
                    <div className="profile-name">
                        <h2>
                            {this.state.first} {this.state.last}
                        </h2>
                    </div>
                    <div className="profile-editor">{this.state.bio}</div>
                    <div className="friendship-button">
                        <FriendshipButton
                            otherId={this.props.match.params.id}
                        />
                    </div>
                    <div>
                        <Wall otherId={this.props.match.params.id} />
                    </div>
                </div>
            </div>
        );
    }
}
