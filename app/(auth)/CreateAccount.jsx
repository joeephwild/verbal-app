import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import {
  Congrat,
  ConnectWallet,
  CreateProfile,
  Intro,
  SelectLang,
  SetProfile,
  SetupPreference,
} from "../../components/authsteps";
import { StatusBar } from "expo-status-bar";
import { StepperControl } from "../../components";
import { useAuth } from "../../context/auth";
import { router } from "expo-router";
import { RlyMumbaiNetwork, createAccount } from "@rly-network/mobile-sdk";
import { auth, db } from "../../firebase";
import { getAccount } from "@rly-network/mobile-sdk";
import { addDoc, collection } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const CreateAccount = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState([]);
  const [selectedLevel, setSelectedLevel] = React.useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [selectedTutorLanguage, setSelectedTutorLanguage] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [profile, setProfile] = useState("");

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    } else {
      router.back();
    }
  };
  const { signup, createProfile, id } = useAuth();

  const handleClick = async () => {
    try {
      switch (currentStep) {
        case 0:
          // Step 0: Proceed to the next step unconditionally
          nextStep();
          break;

        case 1:
          // Step 1: Email and password validation
          if (!email || !password || password !== confirmPassword) {
            return Alert.alert("Wrong Input");
          }

          // Attempt to sign up
          await signup(email, password);

          // Proceed to the next step on successful signup
          nextStep();
          break;

        case 2:
          // Step 2: Language selection validation
          if (!selectedLanguage || !selectedLevel) {
            return Alert.alert("Wrong Input");
          }

          // Proceed to the next step
          nextStep();
          break;

        case 3:
          // Step 3: Account creation and profile update
          if (
            !selectedAccountType ||
            !selectedTutorLanguage ||
            !selectedAvailability ||
            !fullName ||
            !username ||
            !selectedLanguageLevel
          ) {
            return Alert.alert("Wrong Input");
          }

          // // Get and create the account
          const account = await getAccount();
          if (!account) {
            await createAccount();
            await RlyMumbaiNetwork.claimRly();
          }

          const user = auth.currentUser;

          // Create the user profile
          try {
            const docRef = await addDoc(collection(db, "users"), {
              native_language: selectedLanguage,
              native_levels: selectedLevel,
              full_name: fullName,
              userName: username,
              profile_img: profile,
              cover_image: coverImage,
              account: selectedAccountType,
              time_slot: selectedAvailability,
              pro_level: selectedLanguageLevel,
              tutor_lang: selectedTutorLanguage,
              address: account,
            });
            updateProfile(auth.currentUser, {
              displayName: username,
              photoURL: profile,
            })
              .then(() => {
                // Profile updated!
                // ...
                Alert.alert("done");
              })
              .catch((error) => {
                // An error occurred
                // ...
                console.log("error updating profile", error.message);
              });
            console.log("Document written with ID: ", docRef.id);
            Alert.alert("Profile Created successfully");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          nextStep();
          break;

        case 4:
          // Step 4: Handle this step as needed
          // You can add specific logic here for step 4
          // For now, it's commented out
          nextStep();
          break;

        default:
          // Handle unknown steps or provide an error message
          console.error("Unknown step:", currentStep);
          break;
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const displayStep = (step) => {
    switch (step) {
      case 0:
        return <Intro nextStep={nextStep} />;
      case 1:
        return (
          <SetProfile
            setEmail={setEmail}
            email={email}
            password={password}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            confirmPassword={confirmPassword}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <SelectLang
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <CreateProfile
            fullName={fullName}
            setFullName={setFullName}
            setSelectedTutorLanguage={setSelectedTutorLanguage}
            selectedTutorLanguage={selectedTutorLanguage}
            username={username}
            setUsername={setUsername}
            selectedAvailability={selectedAvailability}
            setSelectedAvailability={setSelectedAvailability}
            selectedAccountType={selectedAccountType}
            setSelectedAccountType={setSelectedAccountType}
            setProfile={setProfile}
            profile={profile}
            coverImage={coverImage}
            setCoverImage={setCoverImage}
            setSelectedLanguageLevel={setSelectedLanguageLevel}
            selectedLanguageLevel={selectedLanguageLevel}
            nextStep={nextStep}
          />
        );
      case 4:
        return <ConnectWallet nextStep={nextStep} />;
      case 5:
        return <Congrat />;
      default:
        <Congrat />;
    }
  };

  const steps = [
    "Intro",
    "Select Language",
    "Create Profile",
    "Update Profile",
    "connect wallet",
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <ScrollView>
        <View className="flex-row my-[38px] items-center space-x-[28px] px-4 py-2.5">
          {currentStep !== steps.length && (
            <TouchableOpacity onPress={prevStep}>
              <ArrowLeftIcon size={25} color="white" />
            </TouchableOpacity>
          )}

          {currentStep !== steps.length &&
            steps.map((item, index) => {
              return (
                <View
                  key={index}
                  className={`w-[40px] h-[4px] space-x-2 ${
                    currentStep >= index ? "bg-[#008EFF]" : "bg-[#CCC]"
                  }`}
                />
              );
            })}
        </View>
        <View className="items-center justify-center my-[5px] mx-[24px]">
          {displayStep(currentStep)}
        </View>
        <View className="items-center my-5 justify-center">
          {currentStep !== steps.length && (
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccount;
