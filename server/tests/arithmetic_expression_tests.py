from nose.tools import *
from arithmetic_game_web.game_logic.arithmetic_expression import ArithmeticExpression
import re

def test_question():
    """The question string should contain all aspects of the problem,
    and exclude the answer.
    """
    ae = ArithmeticExpression()
    question = ae.get_question_string()
    a_str = ae._a.__str__()
    b_str = ae._b.__str__()
    regex = re.compile("^%s\s+[^0-9]+\s+%s\s+[^-0-9]*$" % (a_str, b_str))
    assert_is_not_none(regex.match(question))

def test_answer():
    """The answer string should contain all aspects of the problem,
    and the answer.
    """
    ae = ArithmeticExpression()
    answer = ae.get_answer_string()
    a_str = ae._a.__str__()
    b_str = ae._b.__str__()
    answer_str = ae._answer.__str__()
    regex = re.compile("^%s\s+[^0-9]+\s+%s\s+[^-0-9]*%s$" % (a_str, b_str, answer_str))
    assert_is_not_none(regex.match(answer))

def test_check_answer():
    """It should correctly check the answer"""
    ae = ArithmeticExpression()
    question = ae.get_question_string()
    regex = re.compile("^(-?[0-9]*\s+(?:[+\-%%*]|//)\s+-?[0-9]*)\s+[^-0-9]*$")
    match = regex.match(question)
    assert_is_not_none(match)
    answer = eval(match.group(1))
    assert_true(ae.check_answer(answer))
    assert_false(ae.check_answer(answer - 1))
