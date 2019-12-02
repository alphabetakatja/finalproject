import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profilepic";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        // it comes from the BrowserRouter
        console.log("this.props.match: ", this.props.match);
        // the id of the pther user -> this.props.match.params.id
        console.log("this.props.match.params.id: ", this.props.match.params.id);
        // we want to make a request to the server passing along the this.props.match.params.id)
        // the server needs to look up the data about that user adn send back info about he currently logeed in user
        // we need to figure out if the other users id is the same as the logged in users id, if it is then send them away
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
                </div>
            </div>
        );
    }
}
