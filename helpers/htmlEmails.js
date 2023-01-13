const singleEmail = (x, item) => {
  return `
  <table style="padding-top:2mm">
    <thead>
      <tr>
        <th colspan="2">
        ${item.title} : ${item.date}
        </th>
      </tr>
    </thead>
    <tbody style="padding-bottom:1mm">
      <tr>
        <td>${x}</td>
      </tr>
    </tbody>
  </table>
  `;
};

const pieEmail = (item) => {
  return `   
  <table style="padding-top:2mm">
    <thead>
      <tr>
        <th colspan="2">
        ${item.title} : ${item.date}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>How I feel physically : <br><br>${item.physical}</td>
      </tr>
      <tr>
        <td>Insights & thoughts : <br><br>${item.insights}</td>
      </tr>
      <tr>
        <td>How I feel emotionally : <br><br>${item.emotions}</td>
      </tr>
      <tr>
        <td>How I feel spiritually : <br><br>${item.spiritual}</td>
      </tr>
    </tbody>
  </table>
    `;
};

const selfEmail = (item) => {
  return ` 
  <table style="padding-top:2mm">
    <thead>
      <tr>
        <th colspan="2">
        ${item.title} : ${item.date}
        </th>
      </tr>
    </thead>
    <tbody style="padding-top:1mm; padding-bottom:1mm;">
      <tr>
        <td>Initial Thought: <br>${item.initial}</td>
      </tr>
      <tr >
        <td>Rational Thought: <br>${item.rational}</td>
      </tr>
    </tbody>
  </table>
    `;
};

const checkEmail = (item) => {
  return `   
  <table style="padding-top:2mm">
    <thead>
      <tr>
        <th colspan="2">
        ${item.title} : ${item.time} - ${item.date}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Physical: ${item.phys} - Emotional: ${item.mental} - Outlook: ${
    item.outlook
  }, Three Words : ${item.feelOne} - ${item.feelTwo} - ${item.feelThree}</td>
      </tr>
      <tr>
        <td>${
          item.myCheckin ? `<p class="add">${item.myCheckin}</p>` : `</>`
        }</td>
      </tr>
    </tbody>
  </table>
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

export { emailEntries, checkEmail };
