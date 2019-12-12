import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
// import Logo from "./logo";
import { ProfilePic } from "./profilepic";
import Uploader from "./uploader";
import { Profile } from "./profile";
import { Link } from "react-router-dom";
import { OtherProfile } from "./otherprofile";
import { Header } from "./header";
import { FindUsers } from "./findusers";
import { Friends } from "./friends";
import { Chat } from "./chat";
import { Events } from "./events";
import { Wall } from "./wall";
import { EditProfile } from "./edit-profile";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            imageUrl: "",
            uploaderIsVisible: false
        };
        // this.toggleModal = this.toggleModal.bind(this);
    }
    componentDidMount() {
        console.log("app has mounted");
        axios.get("/user.json").then(({ data }) => {
            this.setState({
                first: data.first,
                last: data.last,
                imageUrl: data.url,
                bio: data.bio,
                id: data.id,
                uploaderIsVisible: false
            });
        });
        this.closeModal = this.closeModal.bind(this);
    }
    toggleModal() {
        console.log("toggleModal is running!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }
    closeModal() {
        this.setState({
            uploaderIsVisible: false
        });
    }
    methodInApp(imageUrl) {
        console.log("I am a method in App!");
        console.log("muffin: ", imageUrl);
        this.setState({
            imageUrl: imageUrl
        });
        this.toggleModal();
    }
    updateBio(bio) {
        console.log("I am a method in updateBio!");
        console.log("muffin: ", bio);
        this.setState({
            bio: bio
        });
    }
    // {function}
    render() {
        if (!this.state.id) {
            return null;
        }
        return (
            <div className="app-container">
                <BrowserRouter>
                    <div>
                        <Header>
                            <ProfilePic
                                toggleFunction={this.toggleModal.bind(this)}
                                first={this.state.first}
                                last={this.state.last}
                                imageUrl={this.state.imageUrl}
                                profilePicClass="small-profile"
                            />
                            {this.state.uploaderIsVisible && (
                                <Uploader
                                    methodInApp={this.methodInApp.bind(this)}
                                    closeModal={this.closeModal}
                                />
                            )}
                        </Header>
                        <div className="app-main">
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        first={this.state.first}
                                        last={this.state.last}
                                        imageUrl={this.state.imageUrl}
                                        updateBio={this.updateBio.bind(this)}
                                        bio={this.state.bio}
                                        toggleFunction={this.toggleModal.bind(
                                            this
                                        )}
                                    />
                                )}
                            />

                            <Route
                                path="/user/:id"
                                // component={OtherProfile}
                                render={props => (
                                    <OtherProfile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                            <Route path="/users" component={FindUsers} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/friends" component={Friends} />
                            <Route path="/chat" component={Chat} />
                            <Route path="/wall" component={Wall} />
                            <Route path="/events" component={Events} />
                            <Route
                                path="/edit-profile"
                                component={EditProfile}
                            />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
