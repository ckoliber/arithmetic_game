from time import time

class ScoreKeeper:
    """Keep track of questions answered per unit time."""

    def __init__(self):
        self._counts = [0, 0] # Correct, incorrect
        self._time = [0, 0] # Corresponding accumulated times
        self._current_time = 0
        # It would be nice to break the results down
        # further according to operator or number sizes.

    def start_round(self):
        """Mark the start of a timed round."""
        assert self._current_time == 0, "start_round called out of order"
        self._current_time = time()

    def end_round(self, correct):
        """Mark the end of a timed round, with a boolean indicating
        whether the user won.
        """
        assert self._current_time != 0, "end_round called out of order"
        index = 0
        if not correct:
            index = 1
        self._counts[index] += 1
        self._time[index] += time() - self._current_time
        self._current_time = 0

    def __str__(self):
        strings = []
        correct = ['correctly', 'incorrectly']
        for (i, total_time) in enumerate(self._time):
            strings.append(
                "%d questions answered %s in %d seconds" % (
                    self._counts[i], correct[i], total_time
                )
            )
            if self._counts[i] != 0:
                strings.append(
                    "%g seconds per question" % (
                        total_time / self._counts[i]
                    )
                )
        return '\n'.join(strings)
