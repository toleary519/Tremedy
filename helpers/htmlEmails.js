import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { color } from "../assets/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const emailStyle = () => {
  return `
    <style>
    .bg {
        display: flex;
        flex-direction: column;
        background-color: ${color.bg};
        font-family: roboto, arial, sans-serif;
    }
    .title {
        font-size: 25;
        font-weight: bold;
        color: ${color.font};
        bottom-border: 3px solid ${color.border};
    }
    .subTitle {
        font-size: 20;
        font-weight: bold;
        color: ${color.font};
        margin-left: ${windowWidth * 0.1};
        bottom-border: 3px solid ${color.border};
    }
    .QAbox {
        padding-top: 3%;
        bottom-border: 1% solid ${color.border}
    }
    </style>
    `;
};

const featureEmail = (feature, token) => {
  return `
      <div class="bg">
        <p class="title">Ourtre Team,</p>
        <div class="border">
          <p class="subTitle">I think there should be a feature called: ${feature.name}</p>
        </div>
        <div class="topBox">
          <div class="QAbox">
            <div class="sub">This is what I think it should do:</div>
            <div class="add">${feature.whatsItDo}</div>
          </div>
          <div class="QAbox">
            <div class="sub">This is how I think it should work:</div>
            <div class="add">${feature.howsItWork}</div>
          </div>
          <div class="QAbox">
            <div class="sub">This sort of thing is/would be helpful to me because:</div>
            <div class="add">${feature.howsItHelp}</div>
          </div>
          <div class="QAbox">
            <div class="sub"> In my mind this is how I think it should look:</div>
            <div class="add">${feature.howsItLook}</div>
          </div>
          <div class="QAbox">
            <div class="sub">More notes:</div>
            <div class="add">${feature.notes}</div>
          </div>
          <div class="QAbox">
            <div class="sub">Thanks, </div>
            <div class="add">${token.name}</div>
          </div>
        </div>
      </div>
      `;
};

const bugEmail = (issue, token) => {
  return `

    <div class="bg">
      <p class="title">Ourtre Team,</p>
      <p class="subTitle">I have found a bug in: ${issue.where}</p>
      <div class="topBox">
        <div class="QAbox">
          <div class="sub">This is what happened:</div>
          <div class="add">${issue.what}</div>
        </div>
        <div class="QAbox">
          <div class="sub">This is what I was expecting:</div>
          <div class="add">${issue.expecting}</div>
        </div>
        <div class="QAbox">
          <div class="sub">Additional notes or ideas:</div>
          <div class="add">${issue.bugNotes}</div>
        </div>
        <div class="QAbox">
          <div class="sub">Thanks, </div>
          <div class="add">${token.name}</div>
        </div>
      </div>
    </div>

    `;
};

const singleEmail = (x, item) => {
  return `
          <div class="itemBox">
            <div class="row">
                <p class="sub">${item.title}</p>
                <p class="sub">${item.date}</p>
            </div>
              <p class="add">${x}</p>
          </div>
          `;
};

const pieEmail = (item) => {
  return `   
      <div class="itemBox">
          <div class="row">
              <p class="sub">${item.title}</p>  
              <p class="sub">${item.date}</p>
          </div>
          <div class="column">
              <p class="sub">Physically</p>
              <p class="add">${item.physical}</p>
          </div>
          <div class="column">
              <p class="sub">Insights & Thoughts</p>
              <p class="add">${item.insights}</p>
          </div>
          <div class="column">
              <p class="sub">Emotionally</p>
              <p class="add">${item.emotions}</p>
          </div>
          <div class="column">
              <p class="sub">Spiritually</p>
              <p class="add">${item.spiritual}</p>
          </div>
      </div>
    `;
};

const selfEmail = (item) => {
  return ` 
      <div class="itemBox">
        <div class="row">
            <p class="sub">${item.title}</p>  
            <p class="sub">${item.date}</p>
        </div>
        <div class="column">
            <p class="sub">Initial Thought:</p>
            <p class="add">${item.initial}</p>
        </div>
        <div class="column">
            <p class="sub">Rational Thought:</p>
            <p class="add">${item.rational}</p>
        </div>
      </div>
    `;
};

const checkEmail = (item) => {
  return `   
    <div class="itemBox">
      <div class="row">
          <p class="sub">${item.title}</p>  
          <p class="sub">${item.time} - ${item.date}</p>
      </div>
      <div class="row">
          <p class="sub">Physical: ${item.phys}</p>
          <p class="sub">Emotional: ${item.mental}</p>
          <p class="sub">Outlook: ${item.outlook}</p>
      </div>
      <div class="row">
          <p class="add">${item.feelOne}</p>
          <p class="add">${item.feelTwo}</p>
          <p class="add">${item.feelThree}</p>
      </div>
          ${item.myCheckin ? `<p class="add">${item.myCheckin}</p>` : `</>`}
    </div>
      `;
};

const emailEntries = (fullReport) => {
  let htmlBlock = [];

  for (let item of fullReport) {
    item.check ? htmlBlock.push(checkEmail(item)) : null;
    item.myCoping ? htmlBlock.push(singleEmail(item.myCoping, item)) : null;
    item.myThat ? htmlBlock.push(singleEmail(item.myThat, item)) : null;
    item.myFocus ? htmlBlock.push(singleEmail(item.myFocus, item)) : null;
    item.myBad ? htmlBlock.push(singleEmail(item.myBad, item)) : null;
    item.myGood ? htmlBlock.push(singleEmail(item.myGood, item)) : null;
    item.myValue ? htmlBlock.push(singleEmail(item.myValue, item)) : null;
    item.physical ? htmlBlock.push(pieEmail(item)) : null;
    item.initial ? htmlBlock.push(selfEmail(item)) : null;
  }

  return htmlBlock.join("");
};

export { emailEntries, checkEmail, bugEmail, featureEmail, emailStyle };
