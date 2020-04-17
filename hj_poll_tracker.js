var questionItems = [];
var qtype;
var questionText;

function submitValues() {
  //questionText = getQuestionText();
  questionItems.push(
    "hjid=" + hj.widget.activeWidget.id,
    "hjqt=" + qtype,
    "hjqtxt=" + questionText
  );
  console.log(stringify(questionItems));
  // here goes utag
  utag.link({
    event_attributes_eventName: "hj submit",
    event_category_primaryCategory: "hj submit poll",
    event_eventInfo_effect: "hj submission",
    event_eventInfo_eventLabel: stringify(questionItems)
  });
  questionItems = [];
  //console.log(questionItems);
}

function getQuestionText() {
  var questionText = document.querySelector(
    `#${hj.widget.widgetAttributePrefix}_question_text_${hj.widget.currentQuestionIndex}`
  ).innerHTML;
  return questionText;
}

function getValueOfScale() {
  questionText = getQuestionText();
  questionItems.length = 0;
  var value = document.querySelector(
    `#${hj.widget.widgetAttributePrefix}_question_content_${hj.widget.currentQuestionIndex} .${hj.widget.widgetAttributePrefix}_button_score_active`
  ).dataset.value;
  questionItems.push("hjva=" + value);
  return questionItems;
}

function getValueOfCheckbox() {
  questionText = getQuestionText();
  questionItems.length = 0;
  var nodelist = document.querySelectorAll(
    `#${hj.widget.widgetAttributePrefix}_question_content_${hj.widget.currentQuestionIndex} .${hj.widget.widgetAttributePrefix}_button_radio_checkbox_active`
  );
  var value = Array.from(nodelist).map(function(answer) {
    return answer.dataset.value;
  });

  questionItems.push("hjva=" + value);

  return questionItems;

}

function stringify(array) {
  var arrayResult = array.map(function(i) {
    return "(" + i + ")";
  });

  var result = arrayResult.join("");

  return result;
}

function questionIdentifier() {
  var qtype =
    hj.widget.pollData.content.questions[hj.widget.currentQuestionIndex].type;
  return qtype;
}

function questionValues() {
  qtype = questionIdentifier();

  switch (qtype) {
    case "rating-scale-7":
      return getValueOfScale(qtype);

    // break;
    case "single-close-ended":
      return getValueOfCheckbox(qtype);

    // break;
    case "multiple-close-ended":
      return getValueOfCheckbox(qtype);

    // break;
    case "rating-scale-5":
      return getValueOfScale(qtype);

    // break;
    case "net-promoter-score":
      return getValueOfScale(qtype);

    // break;
    default:
  }
}

document
  .getElementById("_hj-f5b2a1eb-9b07_action_submit")
  .parentElement.addEventListener("click", function() {
    if (
      (qtype == "rating-scale-7" ||
        qtype == "single-close-ended" ||
        qtype == "multiple-close-ended" ||
        qtype == "rating-scale-5" ||
        qtype == "net-promoter-score") &&
      questionItems.length !== 0
    ) {
      submitValues();
    }

    document
      .querySelector(
        `#${hj.widget.widgetAttributePrefix}_question_content_${hj.widget.currentQuestionIndex}`
      )
      .removeEventListener("click", getValueOnClick());
  });

function getValueOnClick() {
  document
    .querySelector(
      `#${hj.widget.widgetAttributePrefix}_question_content_${hj.widget.currentQuestionIndex}`
    )
    .addEventListener("click", function() {
      if (
        document.querySelector(
          `#${hj.widget.widgetAttributePrefix}_question_content_${hj.widget.currentQuestionIndex} .${hj.widget.widgetAttributePrefix}_button_score_active`
        ) !== null ||
        document.querySelectorAll(
          `#${hj.widget.widgetAttributePrefix}_question_content_${hj.widget.currentQuestionIndex} .${hj.widget.widgetAttributePrefix}_button_radio_checkbox_active`
        ) !== null
      ) {
        //var questionIndex = hj.widget.currentQuestionIndex;
        return questionValues();
      }
    });
}
getValueOnClick();
