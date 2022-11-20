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

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const emailStyle = () => {
  return `
    <style>
    .bg {
        display: flex;
        height: ${windowHeight};
        flex-direction: column;
        background-color: ${color.bg};
        font-family: roboto, arial, sans-serif;
    }
    .reportBg {
        display: flex;
        flex-wrap: wrap;
        height: ${windowHeight};
        flex-direction: column;
        background-color: ${color.bg};
        font-family: roboto, arial, sans-serif;
    }
    .topBox {
        justify-content: flex-start;
        margin-left: ${windowWidth * 0.1};
    }
    .add {
        margin-right: ${windowWidth * 0.1};
        font-size: 18;
        font-weight: bold;
        color: ${color.font};
    }
    .title {
        padding-top: ${windowHeight * 0.05};
        font-size: 25;
        font-weight: bold;
        color: ${color.font};
        margin-left: ${windowWidth * 0.1};
        bottom-border: 3px solid ${color.border};
    }
    .subTitle {
        font-size: 20;
        font-weight: bold;
        color: ${color.font};
        margin-left: ${windowWidth * 0.1};
        bottom-border: 3px solid ${color.border};
    }
    .sub {
        margin-right: ${windowWidth * 0.1};
        text-align: flex-start;
        align-items: center;
        opacity: 0.6;
        font-size: 15px;
        font-weight: bold;
        color: ${color.font};
    }
    .border {
        borderBottomColor: ${color.border};
        border-width: 1;   
    }
    .elementHeader {
        margin: ${windowWidth * 0.05};
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .QAbox {
        padding-top: 3%;
        bottom-border: 1% solid ${color.border}
    }
    .reportBox {
      margin: ${windowWidth * 0.05};
      height: ${windowHeight * 0.16};
      width: ${windowWidth * 0.5};
      border: 3px solid ${color.border};
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
 
    <div class="border">
        <div class="elementHeader">
            <div class="sub">${item.title}</div>
            <div class="sub">${item.date}</div>
        </div>
        <div class="element">
            <div class="add">${x}</div>
        </div>
    </div>
 
    `;
};

const pieEmail = (item) => {
  return ` 
 
    <div class="border">
        <div class="elementHeader">
            <div class="sub">${item.title}</div>
            <div class="sub">${item.date}</div>
        </div>
        <div class="element">
            <div>
                <div class="sub">Physically</div>
                <div class="add">${item.physical}</div>
            </div>
        </div>
        <div class="element">
            <div>
                <div class="sub">Physically</div>
                <div class="add">${item.insights}</div>
            </div>
        </div>
        <div class="element">
            <div>
                <div class="sub">Physically</div>
                <div class="add">${item.emotions}</div>
            </div>
        </div>
        <div class="element">
            <div>
                <div class="sub">Physically</div>
                <div class="add">${item.spiritual}</div>
            </div>
        </div>
    </div>

    `;
};

const selfEmail = (item) => {
  return ` 
  
    <div class="border">
        <div class="elementHeader">
            <div class="sub">${item.title}</div>
            <div class="sub">${item.date}</div>
        </div>
        <div class="element">
            <div>
                <div class="sub">Initial Thought:</div>
                <div class="add">${item.initial}</div>
            </div>
        </div>
        <div class="element">
            <div>
                <div class="sub">Rational Thought:</div>
                <div class="add">${item.rational}</div>
            </div>
        </div>
    </div>
  
    `;
};

const checkEmail = (item) => {
  return `   
    <div class="border">
        <div class="elementHeader">
            <div class="sub">${item.title}</div>
            <div class="sub">${item.time} - ${item.date}</div>
        </div>
        <div class="elementHeader">
            <div>
                <div class="sub">Physical : ${item.phys}</div>
                <div class="sub">Emotional : ${item.mental}</div>
                <div class="sub">Outlook : ${item.outlook}</div>
            </div>
        </div>
        <div class="elementHeader">
            <div class="add">${item.feelOne}</div>
            <div class="add">${item.feelTwo}</div>
            <div class="add">${item.feelThree}</div>
        </div>
        <div class="element">
            ${item.myCheckin ? <div class="add">{item.myCheckin}</div> : null}
        </div>
    </div>
 
    `;
};

const emailEntries = (item) => {
  item.check ? checkEmail(item) : null;
  item.myCoping ? singleEmail(item.myCoping, item) : null;
  item.myThat ? singleEmail(item.myThat, item) : null;
  item.myFocus ? singleEmail(item.myFocus, item) : null;
  item.myBad ? singleEmail(item.myBad, item) : null;
  item.myGood ? singleEmail(item.myGood, item) : null;
  item.myValue ? singleEmail(item.myValue, item) : null;
  item.physical ? pieEmail(item) : null;
  item.initial ? selfEmail(item) : null;
};

export { emailEntries, checkEmail, bugEmail, featureEmail, emailStyle };
