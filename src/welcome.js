import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Register from "./registration";
import Login from "./login";
// import { Link } from "react-router-dom";
// try to make a modal for register and login

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formIsVisible: false
        };
    }
    toggleForm() {
        console.log("toggleForm is running!");
        this.setState({
            formIsVisible: !this.state.formIsVisible
        });
    }
    closeModal() {
        this.setState({
            formIsVisible: false
        });
    }
    render() {
        return (
            <HashRouter>
                <header className="v-header container">
                    <div className="fullscreen-video-wrapper">
                        <video
                            src="./video/background-video.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                        ></video>
                    </div>
                    <div className="header-overlay"></div>
                    <div className="form-header-wrapper">
                        <div className="header-content">
                            <h1>FemmeTor</h1>
                            <p>A mentorship platform for womxn developers</p>
                            <a href="#about-section" className="btn">
                                Read More
                            </a>
                        </div>
                    </div>
                </header>

                <section className="section section-a" id="about-section">
                    <div className="container">
                        <h2>FemmeTor</h2>
                        <p>
                            In my final project I decided to tackle the problem
                            that is both of my personal and public interest. I
                            am talking about underrepresentation of women in the
                            digital economy. The digital revolution is fully
                            underway, and the tech industry is reshaping the
                            world. That means that more and more businesses will
                            take place online as we move into the future, and if
                            women are disproportionately excluded from the
                            digital economy, then the divide between the
                            opportunities available to men and to women will
                            widen with each passing year. Even though it would
                            be easy to imagine a western-European country, for
                            example Germany, to be setting a good example of
                            gender equality in tech, that is unfortunately not
                            the case. <br /> <br />{" "}
                        </p>
                        <img id="graph" src="./images/women-tech.jpg" />
                        <p>
                            There are many ways through which the current state
                            could be improved: by adapting novel legislations or
                            through education, but anyway by creating
                            stimulative environment for women participation in
                            tech developments, from their early age until their
                            professional careers. I am here presenting an online
                            platform made for women by women, that establishes
                            friendly/pleasant environment for female mentors and
                            female mentees to get in touch, exchange knowledge,
                            give support to each other, and share tips and
                            tricks.
                        </p>
                    </div>
                </section>

                <section className="section section-b">
                    <div className="container">
                        <div>
                            <Route exact path="/" component={Register} />
                            <Route path="/login" component={Login} />
                        </div>
                    </div>
                    <div className="container">
                        <h2>Here is how it works:</h2>
                        <ul>
                            <li>
                                <ion-icon
                                    className="flaticon"
                                    name="create"
                                ></ion-icon>
                                <p>Register & join</p>
                            </li>
                            <li>
                                <ion-icon
                                    className="flaticon"
                                    name="person"
                                ></ion-icon>
                                <p>Create a profile</p>
                            </li>
                            <li>
                                <ion-icon
                                    className="flaticon"
                                    name="people"
                                ></ion-icon>
                                <p>Find a mentor</p>
                            </li>
                            <li>
                                <ion-icon
                                    className="flaticon"
                                    name="chatbubbles"
                                ></ion-icon>
                                <p>Exchange messages</p>
                            </li>
                            <li>
                                <ion-icon
                                    className="flaticon"
                                    name="laptop"
                                ></ion-icon>
                                <p>Start learning</p>
                            </li>
                            <li>
                                <ion-icon
                                    className="flaticon"
                                    name="woman"
                                ></ion-icon>
                                <p>Become a mentor</p>
                            </li>
                        </ul>
                    </div>
                </section>
            </HashRouter>
        );
    }
}
