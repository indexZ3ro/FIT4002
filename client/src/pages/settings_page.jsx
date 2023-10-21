import React, { useEffect, useState } from "react";
import "../css/settings.css";
import settingsIcon from "../assets/settings-icon.png";
import TextButton from "../Components/Buttons/textButton";
import { onAuthStateChanged, updateProfile, updateEmail, deleteUser, getAuth } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");

    const update = () => {
        // TO DO
        const currentUser = auth.currentUser;
        console.log(email);
        console.log(currentUser.email);
        // console.log(email);
        // console.log(userId);

        if(name.trim() != "" && currentUser.displayName != name){
            updateProfile(currentUser, {
                displayName: name,
            })
            .then(() => {
                console.log("name updated")
                // Profile updated!
                // ...
            })
            .catch((error) => {
                // An error occurred
                // ...
                console.log(error);
            });
        }else{
            console.log("no change to name");
            // Print something
        }

        if(email.trim() != "" && currentUser.email != email && currentUser.emailVerified == true){
            console.log("not empty and not same and google");
        

            // currentUser.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider())
            // .then(function(userCredential) {
            //     // You can now delete the user:
            //     return firebase.auth().currentUser.delete();
            // })
            // .catch(function(error) {
            //     // Credential mismatch or some other error.
            // });
            // updateEmail(auth.currentUser, "user@example.com").then(() => {
            //     console.log("email updated")
            //     // Email updated!
            //     // ...
            //   }).catch((error) => {
            //     console.log(error);
            //     // An error occurred
            //     // ...
            //   });
        }else{
            console.log("email empty");
            // Print something
        }

        // if(password.trim() != "" ){
        //     console.log("not empty");
        // }else{
        //     console.log("empty");
        // }
    };

    const deleteAcc = () => {
        // TO DO
        // const currentUser = auth.currentUser;
        // deleteUser(currentUser).then(() => {
        // // User deleted.
        // console.log("user deleted")
        // }).catch((error) => {
        //     console.log(error);
        // // An error ocurred
        // // ...
        // });
    };



    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            setEmail(user.email);
            setName(user.displayName);
            setUserId(user.uid);

            console.log(user)
          } else {
            // User is signed out
            // ...
            navigate("/");
            console.log("user is logged out");
          }
        });
    }, []);

    

    return (
        <div className="settings-page">
            <div className="split-left-settings">
                <img className="settingsPageCoverImg" src={settingsIcon}></img>
            </div>

            <div className="split-right-settings">
                <div className="settings-container">
                    <div className="settings-Title">Settings</div>
                    <div className="input-container-settings">
                        <input
                            className="userInput"
                            placeholder="Name"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                        <input
                            className="userInput"
                            placeholder="Email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <input
                            className="userInput"
                            type={"password"}
                            name="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <p className="error-message">{error}</p>
                    <div>
                        <TextButton
                            id="update"
                            customStyle={{
                                width: "15vw",
                                height: "5vh",
                                backgroundColor: "rgba(200, 150, 249, 0.3)",
                                borderColor: "rgba(200, 150, 249, 0.3)",
                            }}
                            handleClick={update}
                        />
                        <TextButton
                            id="Delete Account"
                            customStyle={{
                                width: "15vw",
                                height: "5vh",
                                backgroundColor: "rgba(255, 47, 34, 0.3)",
                                borderColor: "rgba(200, 150, 249, 0.3)",
                            }}
                            handleClick={deleteAcc}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Settings;
