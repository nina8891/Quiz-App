import React from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends React.Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {   question: 'You work on a Javascript project. How do you prompt users with messages and at the same time requesting user inputs?',
                rightAnswerId: 3,
                id: 1,
                answers: [
                    {text: 'Alert()', id: 1},
                    {text: 'Display()', id: 2},
                    {text: 'Prompt()', id: 3},
                    {text: 'Confirm()', id: 4}
                ]
            },
            {   question: 'Which of the following function of Array object reverses the order of the elements of an array?',
                rightAnswerId: 1,
                id: 2,
                answers: [
                    {text: 'reverse()', id: 1},
                    {text: 'push()', id: 2},
                    {text: 'reduceRight()', id: 3},
                    {text: 'reduce()', id: 4}
                ]
            },
            {   question: 'How do you find the number with the highest value of x and y?',
            rightAnswerId: 1,
            id: 3,
            answers: [
                {text: 'Math.max(x, y)', id: 1},
                {text: 'top(x, y)', id: 2},
                {text: 'ceil(x, y)', id: 3},
                {text: 'Math.ceil(x, y)', id: 4}
            ]
        }
        ]
    }

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return 
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
 
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    }) 
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)             

        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    componentDidMount() {
        console.log('Quiz ID = ', this.props.match.params.id);
        
    }

    render () {
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Choose the answer</h1>

                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        : <ActiveQuiz 
                        question={this.state.quiz[this.state.activeQuestion].question}
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        questionNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                        />
                    }

                </div>
            </div>
        )
    }
}

export default Quiz