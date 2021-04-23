from nose.tools import *
from arithmetic_game_web.game_logic.small_integer import SmallInteger

def test_max_immutability():
    """Ensure that the `MAX` constant of the class
    is unchangeable.
    """
    max1 = SmallInteger.MAX
    try:
        SmallInteger.MAX = max1 - 1
    except AttributeError:
        pass
    max2 = SmallInteger.MAX
    assert_equal(max1, max2)

def test_value():
    """Probabilistic test that the value is small
    and non-negative"""
    for i in range(0, SmallInteger.MAX * 10):
        s_integer = SmallInteger()
        assert_true(s_integer.value <= SmallInteger.MAX)
        assert_true(s_integer.value > 0)

def test_str():
    """Test correct string representation"""
    s_integer = SmallInteger()
    assert_equal(s_integer.value, int("%s" % s_integer))
