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
    .reportBg {
        display: flex;
        height: 100%;
        flex-direction: column;
        background-color: ${color.bg};
        font-family: roboto, arial, sans-serif;
    }
    .reportTop {
      flex-direction: row;
    }
    .reportNameDate {
      flex-direction: column;
      width: 33%;
    }
    .reportVitals {
      flex-direction: column;
      width: 66%;
    }
    .reportItemsBox {
      flex-direction: column;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
    .reportBox {
      width: 25%;
      border-bottom: 1px solid ${color.border};
    }
    .add {
      font-size: 12;
        font-weight: bold;
        color: ${color.font};
    }
    .sub {
        opacity: 0.7;
        font-size: 10;
        font-weight: bold;
        color: ${color.font};
    }
    #elementHeader {
      flex-direction: "row";
      justify-content: space-around;
    }
    .left {
      flex-direction: row;
      justify-content: flex-start;
    }
    .right {
    flex-direction: row;
      justify-content: flex-end;
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
  let obj = {
    html: `
            <span class="sub">${item.title}</span>
            <span class="sub">${item.date}</span>
            <div class="add">${x}</div>
          `,
  };
  return obj;
};

const pieEmail = (item) => {
  return ` 

        <div class="elementHeader">
            <div class="sub">${item.title}</div>
            <div class="sub">${item.date}</div>
        </div>
        <div class="elementHeader">
            <div>
                <div class="sub">Physically</div>
                <div class="add">${item.physical}</div>
            </div>
        </div>
        <div class="elementHeader">
            <div>
                <div class="sub">Physically</div>
                <div class="add">${item.insights}</div>
            </div>
        </div>
        <div class="elementHeader">
            <div>
                <div class="sub">Physically</div>
                <div class="add">${item.emotions}</div>
            </div>
        </div>
        <div class="elementHeader">
            <div>
                <div class="sub">Physically</div>
                <div class="add">${item.spiritual}</div>
            </div>
        </div>

    `;
};

const selfEmail = (item) => {
  return ` 
        <div class="elementHeader">
            <div class="sub">${item.title}</div>
            <div class="sub">${item.date}</div>
        </div>
        <div class="elementHeader">
            <div>
                <div class="sub">Initial Thought:</div>
                <div class="add">${item.initial}</div>
            </div>
        </div>
        <div class="elementHeader">
            <div>
                <div class="sub">Rational Thought:</div>
                <div class="add">${item.rational}</div>
            </div>
        </div>
    `;
};

const checkEmail = (item) => {
  return `   
        <div id="elementHeader">
            <p class="sub">${item.title}</p>  
            <p class="sub">${item.time} - ${item.date}</p>
        </div>
        <div>
        <div>
        <p class="sub">Physical: ${item.phys}</p>
        <p class="sub">Emotional: ${item.mental}</p>
        <p class="sub">Outlook: ${item.outlook}</p>
        </div>
        <div>
        <p class="add">${item.feelOne}</p>
        <p class="add">${item.feelTwo}</p>
        <p class="add">${item.feelThree}</p>
        </div>
        </div>
        <p class="elementHeader">
            ${item.myCheckin ? `<p class="add">${item.myCheckin}</p>` : `</>`}
        </p>
      `;
};

const textHtml = (item) => {
  return `${item.myCoping ? singleEmail(item.myCoping, item) : `</>`}`;
};
const emailEntries = (item) => {
  return `
    ${
      item.check
        ? checkEmail(item)
        : item.myCoping
        ? singleEmail(item.myCoping, item)
        : item.myThat
        ? singleEmail(item.myThat, item)
        : item.myFocus
        ? singleEmail(item.myFocus, item)
        : item.myBad
        ? singleEmail(item.myBad, item)
        : item.myGood
        ? singleEmail(item.myGood, item)
        : item.myValue
        ? singleEmail(item.myValue, item)
        : item.physical
        ? pieEmail(item)
        : item.initial
        ? selfEmail(item)
        : `</>`
    }
    `;
};

export {
  emailEntries,
  checkEmail,
  bugEmail,
  textHtml,
  featureEmail,
  emailStyle,
};
