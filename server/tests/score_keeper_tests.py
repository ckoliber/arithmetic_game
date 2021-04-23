from nose.tools import *
from mock import patch

from arithmetic_game_web.game_logic.score_keeper import ScoreKeeper

@patch('arithmetic_game_web.game_logic.score_keeper.time',return_value=1)
def test_start_round(mock_time):
    sk = ScoreKeeper()
    sk.start_round()
    assert_equal(sk._current_time, mock_time())

@raises(AssertionError)
def test_start_round_order():
    sk = ScoreKeeper()
    sk._current_time = 1
    sk.start_round()

@raises(AssertionError)
def test_end_round_order():
    sk = ScoreKeeper()
    sk.end_round(True)

def test_end_round_correct():
    with patch('arithmetic_game_web.game_logic.score_keeper.time',return_value=1) as mock_time:
        sk = ScoreKeeper()
        sk.start_round()
        mock_time.return_value = 4
        sk.end_round(True)
        assert_equal(sk._time, [3, 0])
        assert_equal(sk._current_time, 0)
        assert_equal(sk._counts, [1, 0])

def test_end_round_incorrect():
    with patch('arithmetic_game_web.game_logic.score_keeper.time',return_value=1) as mock_time:
        sk = ScoreKeeper()
        sk.start_round()
        mock_time.return_value = 4
        sk.end_round(False)
        assert_equal(sk._time, [0, 3])
        assert_equal(sk._current_time, 0)
        assert_equal(sk._counts, [0, 1])

def test_str():
    with patch('arithmetic_game_web.game_logic.score_keeper.time',return_value=1) as mock_time:
        sk = ScoreKeeper()
        sk.start_round()
        mock_time.return_value = 4
        sk.end_round(False)
        assert_equal(sk._time, [0, 3])
        assert_equal(sk._current_time, 0)
        assert_equal(sk._counts, [0, 1])
        sk.start_round()
        mock_time.return_value = 9
        output = sk.__str__()
        assert_equal(output,
            "0 questions answered correctly in 0 seconds\n"
            "1 questions answered incorrectly in 3 seconds\n"
	        "3 seconds per question"
        )
        sk.end_round(True)
        assert_equal(sk._time, [5, 3])
        assert_equal(sk._current_time, 0)
        assert_equal(sk._counts, [1, 1])
        sk.start_round()
        mock_time.return_value = 10
        sk.end_round(True)
        assert_equal(sk._time, [6, 3])
        assert_equal(sk._current_time, 0)
        assert_equal(sk._counts, [2, 1])
        output = sk.__str__()
        assert_equal(output,
            "2 questions answered correctly in 6 seconds\n"
	        "3 seconds per question\n"
            "1 questions answered incorrectly in 3 seconds\n"
	        "3 seconds per question"
        )
