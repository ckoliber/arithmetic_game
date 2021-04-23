from .arithmetic_operator import ArithmeticOperator
from .small_integer import SmallInteger

class ArithmeticExpression:
    """Select a random arithmetic expression."""

    def __init__(self):
        self._a = SmallInteger()
        self._b = SmallInteger()
        self._op = ArithmeticOperator()
        self._answer = self._op.apply(self._a, self._b)

    def get_question_string(self):
        """Get a string representation of the expression."""
        return "%s %s %s = ?" % (self._a, self._op, self._b)

    def get_answer_string(self):
        """Get a string representation of the expression and it's result."""
        return "%s %s %s = %d" % (self._a, self._op, self._b, self._answer)

    def check_answer(self, test):
        """Returns a boolean indicating whether the answer is correct.
        Expects an Integer as input.
        """
        return test == self._answer
