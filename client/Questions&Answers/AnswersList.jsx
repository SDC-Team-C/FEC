import React from 'react';
// import PropTypes from 'prop-types';

// eslint-disable-next-line import/extensions
import answers from './answers.js';

function Answerslist() {

  return (
    <div className="answersList">
      {answers.map((answer) => (
        <div key={answer.answer_id} className="answer">
          <span>
            <strong>A:  </strong>
            {answer.body}
          </span>
        </div>
    ))}
    </div>
);
    }

// Answerslist.propTypes = {
//   answers: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object, PropTypes.array]).isRequired
// }

export default Answerslist;