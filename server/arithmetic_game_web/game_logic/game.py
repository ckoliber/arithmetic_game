from .score_keeper import ScoreKeeper
from .arithmetic_expression import ArithmeticExpression


class GameOverMsg(Exception):
    pass


class BadInputMsg(Exception):
    pass


QUIT = "quit"


class GameOutput:
    """Holds together an instruction message,
    the current arithmetic question or answer,
    an error message, and a score.

    All of these attributes are strings or `None`.
    """

    def __init__(self, instruction=None, expression=None, error=None, score=None):
        """`error` is expected to be an Exception,
        and `score` is expected to be a `ScoreKeeper` object.
        The other arguments are expected to be strings.
        """
        self.instruction = instruction
        self.expression = expression
        if error:
            self.error = error.__str__()
        else:
            self.error = None
        if score:
            self.score = score.__str__()
        else:
            self.score = None

    def __str__(self):
        """Intended for debugging purposes."""
        return "%s = %s" % (type(self).__name__, self.__dict__)


def parse_input(input_str):
    if not isinstance(input_str, str):
        raise BadInputMsg("Expected a string as input.")
    words = input_str.split()
    if len(words) != 1:
        raise BadInputMsg("Expected a single word or number as input.")
    else:
        word = words[0]
        if word == QUIT:
            raise GameOverMsg("You have quit.")
        try:
            return int(input_str)
        except ValueError as err:
            raise BadInputMsg("Please enter an integer.")


def run_game():
    """A small arithmetic quiz game.

    Runs as a generator, which yields instructions for the player,
    and stops yielding messages after the game is over.
    All output is `GameOutput` objects.
    """

    score = ScoreKeeper()

    expression = None
    try:
        while True:
            expression = ArithmeticExpression()
            # Starting the round before displaying the question means
            # that network latency and rendering speed are not taken into account.
            score.start_round()
            question = expression.get_question_string()
            test_answer = yield GameOutput(expression=question)
            retry = True
            while retry:
                try:
                    test_answer = parse_input(test_answer)
                    retry = False
                    correct = expression.check_answer(test_answer)
                    score.end_round(correct)
                    if correct:
                        yield GameOutput(
                            instruction="Correct!",
                            expression=expression.get_answer_string(),
                        )
                    else:
                        raise GameOverMsg(
                            "Incorrect. Your answer was: " "%s." % test_answer
                        )
                except BadInputMsg as err:
                    test_answer = yield GameOutput(expression=question, error=err)
    except GameOverMsg as err:
        yield GameOutput(
            instruction="End of game.",
            expression=expression.get_answer_string(),
            error=err,
            score=score,
        )

    return


__all__ = [run_game, GameOutput]
