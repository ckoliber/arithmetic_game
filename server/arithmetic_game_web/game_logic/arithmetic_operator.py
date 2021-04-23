import random
import operator

class ArithmeticOperator:
    """Select a random arithmetic binary operator."""

    _operators = [
        ('+', operator.add),
        ('//', operator.floordiv),
        ('%', operator.mod),
        ('*', operator.mul),
        ('-', operator.sub)
    ]

    def __init__(self):
        (self._symbol, self._op) = random.choice(self._operators)

    def __str__(self):
        return self._symbol

    def apply(self, a, b):
        """Evaluate the operator on the given arguments"""
        return self._op(a.value, b.value)
