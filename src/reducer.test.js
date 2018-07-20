import reducer from "./reducer"
import {restartGame, makeGuess, generateAuralUpdate} from './actions';

describe("reducer", ()=>{
    const correctAnswer1 = 25;
    const guessesSingle = [50];
    const guessesMulti = [45,12,90];
    const feedback1 = "Test Feedback";
    const auralStatus1 = "Test Aural Status"
    const testState1 = {guesses:guessesSingle, feedback:feedback1, auralStatus:auralStatus1, correctAnswer: correctAnswer1}
    const testState2 = {guesses:guessesMulti, feedback:feedback1, auralStatus:auralStatus1, correctAnswer: correctAnswer1}

    describe("No Actions passed in", ()=>{
        it("Should set the initial state when nothing is passed in", ()=>{
            const state = reducer(undefined,"NOT_EXISTING");
            expect(state.guesses).toEqual([]);
            expect(state.feedback).toEqual('Make your guess!');
            expect(state.auralStatus).toEqual('');
            expect(state.correctAnswer).toBeLessThanOrEqual(101);
            expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
        });
    
        it("Should return the passed in state when the action is not defined", ()=>{
            const newState = {};
            const state = reducer(newState, "NOT_EXISTING");
            expect(state).toEqual(newState);
        });
    });


    describe("generateAuralUpdate", ()=>{
        it("Should provide a statement about the initial state", ()=>{
            const state = reducer(undefined, generateAuralUpdate());
            expect(state.guesses).toEqual([]);
            expect(state.feedback).toEqual("Make your guess!")
            expect(state.auralStatus).toEqual("Here's the status of the game right now: Make your guess! You've made 0 guesses.");
        })

        it("Should provide a grammatically correct statement based on a single guess", ()=>{
            const state = reducer(testState1, generateAuralUpdate());
            expect(state.auralStatus).toEqual("Here's the status of the game right now: Test Feedback You've made 1 guess. It was: 50")
        })
    });

    describe("restartGame", ()=>{
        it("Should return the state with initialState properties except with a new correct answer", ()=>{
            const state = reducer(testState1, restartGame(correctAnswer1));
            expect(state.guesses).toEqual([]);
            expect(state.feedback).toEqual("Make your guess!");
            expect(state.auralStatus).toEqual("");
            expect(state.correctAnswer).toEqual(25);
        })
    });

    describe("makeGuess", ()=>{
        it("Should provide appropriate feedback when fed Nan", ()=>{
            const testNan = "test";
            const state = reducer(testState1, makeGuess(testNan));
            expect(state.feedback).toEqual("Please enter a valid number.");
        });

        it("Should provide proper feedback", ()=>{
        // if (difference >= 50)
            let state = testState2;

            state = reducer(testState1, makeGuess(75));
            expect(state.feedback).toEqual("You're Ice Cold...")

        // if (difference >= 30)
            state = reducer(testState1, makeGuess(55));
            expect(state.feedback).toEqual("You're Cold...")

        // if (difference >= 10)
            state = reducer(testState1, makeGuess(15));
            expect(state.feedback).toEqual("You're Warm.")

        // if (difference >= 1)
            state = reducer(testState1, makeGuess(24));
            expect(state.feedback).toEqual("You're Hot!")

        // if correct
            state = reducer(testState1, makeGuess(25));
            expect(state.feedback).toEqual("You got it!")
        })
    })

})
