import random

class max_property(type):
    """Provides a MAX property for the class."""

    @property
    def MAX(cls):
        """Maximum integer value."""
        return cls._MAX

class SmallInteger(metaclass=max_property):
    """Select a random integer from one up to SmallInteger.MAX"""

    _MAX = 100

    def __init__(self):
        (self._value) = random.randint(1, self._MAX)

    def __str__(self):
        return "%d" % self._value

    @property
    def value(self):
        return self._value
