from nose.tools import *
import unittest
from arithmetic_game_web.game_logic import game
import re
from mock import patch

GameOutput = game.GameOutput

class test_GameOutput(unittest.TestCase):

    class MockScoreKeeper:
        def __str__(self):
            return "score"

    def test_format(self):
        """Ensure that the full interface of the class is as expected."""
        inst = "instruction"
        exp = "expression"
        err = Exception("error")
        score = type(self).MockScoreKeeper()
        gameOutputs = [
            GameOutput(inst, exp, err, score),
            GameOutput(
                score=score,
                instruction=inst,
                expression=exp,
                error=err
            )
        ]
        for gameOutput in gameOutputs:
            assert_is(gameOutput.instruction, inst)
            assert_is(gameOutput.expression, exp)
            assert_equal(gameOutput.error, err.__str__())
            assert_equal(gameOutput.score, score.__str__())

    def test_defaults(self):
        """Ensure that default values are provided for arguments."""
        gameOutput = GameOutput()
        assert_is_none(gameOutput.instruction)
        assert_is_none(gameOutput.expression)
        assert_is_none(gameOutput.error)
        assert_is_none(gameOutput.score)

    def test_str(self):
        """Check accuracy of debugging output."""
        inst = "instruction"
        exp = "expression"
        err = Exception("error")
        score = type(self).MockScoreKeeper()
        gameOutput = GameOutput(inst, exp, err, score)
        actual = gameOutput.__str__()
        expected = (type(gameOutput).__name__) + " = " + ({
            "instruction": inst,
            "expression": exp,
            "error": err.__str__(),
            "score": score.__str__()
        }.__str__())
        assert_equal(actual, expected)

BadInputMsg = game.__dict__['BadInputMsg']
GameOverMsg = game.__dict__['GameOverMsg']
QUIT = game.__dict__['QUIT']
parse_input = game.__dict__['parse_input']
run_game = game.run_game

class test_parse_input(unittest.TestCase):

    @raises(BadInputMsg)
    def test_none(self):
        """Assert that None is gracefully rejected."""
        parse_input(None)

    @raises(BadInputMsg)
    def test_input_length(self):
        """Assert that only one-token inputs are accepted."""
        parse_input("Two\twords")

    @raises(GameOverMsg)
    def test_quit(self):
        """It should accept a quit message."""
        parse_input(QUIT)

    @raises(BadInputMsg)
    def test_non_integer(self):
        """It should reject non-integer input"""
        parse_input("1.32")

    def test_integer(self):
        """It should accept an integer input"""
        assert_equal(parse_input("45325"), 45325)

class MockArithmeticExpression:
    correct_switch = True
    question = "question"
    answer = "answer"

    def __init__(self):
        pass

    def get_question_string(self):
        return self.question

    def get_answer_string(self):
        return self.answer

    def check_answer(self, test_value):
        assert_true(isinstance(test_value, int))
        return self.correct_switch

class test_run_game(unittest.TestCase):

    @raises(StopIteration)
    def test_quit(self):
        """It should accept a quit message as the first input.
        """
        gen = run_game()
        output = gen.send(None) # Get first question
        assert_true(isinstance(output, GameOutput))
        output = gen.send(QUIT) # Answer first question
        assert_true(isinstance(output, GameOutput))
        gen.send(None) # Game should have ended

    def test_bad_input(self):
        """It should retry a question on bad input
        """
        gen = run_game()
        output = gen.send(None) # Get first question
        assert_true(isinstance(output, GameOutput))
        question = output.expression
        output = gen.send(None) # Fail to answer first question
        assert_true(isinstance(output, GameOutput))
        assert_equal(output.expression, question)
        assert_is_none(output.score)
        assert_is_not_none(output.error)

    @raises(StopIteration)
    @patch(
        'arithmetic_game_web.game_logic.game.ArithmeticExpression',
        new=MockArithmeticExpression
    )
    def test_wrong_answer(self):
        """It should end game on wrong answer.
        """
        gen = run_game()
        output = gen.send(None) # Get first question
        assert_true(isinstance(output, GameOutput))
        assert_equal(output.expression, MockArithmeticExpression.question)
        MockArithmeticExpression.correct_switch = False
        output = gen.send("1") # Incorrectly answer first question
        MockArithmeticExpression.correct_switch = True
        assert_true(isinstance(output, GameOutput))
        assert_equal(output.expression, MockArithmeticExpression.answer)
        assert_is_not_none(output.score)
        gen.send(None) # Game should have ended

    @patch(
        'arithmetic_game_web.game_logic.game.ArithmeticExpression',
        new=MockArithmeticExpression
    )
    def test_right_answer(self):
        """It should go to the next question on a correct answer.
        """
        gen = run_game()
        output = gen.send(None) # Get first question
        assert_true(isinstance(output, GameOutput))
        assert_equal(output.expression, MockArithmeticExpression.question)
        output = gen.send("1") # Correctly answer first question
        assert_true(isinstance(output, GameOutput))
        assert_equal(output.expression, MockArithmeticExpression.answer)
        assert_is_none(output.score)
        assert_is_none(output.error)
        output = gen.send(None) # Get second question
        assert_true(isinstance(output, GameOutput))
        assert_equal(output.expression, MockArithmeticExpression.question)
