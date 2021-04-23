import web
from ..game_logic.game import QUIT, run_game
from .serialization import GameOutputJSONEncoder

web.config.debug = False

urls = ("/", "Index", "/game", "Game")

app = web.application(urls, locals())
store = web.session.DiskStore("sessions")
# The contents of sessions are a workaround for the fact that live generators
# cannot be serialized (i.e. to be stored in sessions).
# See http://grokbase.com/t/python/python-bugs-list/112qmspt71/issue11299-allow-deepcopying-and-pickling-paused-generators
# Had I known, I would have used some means other than generators to store state.
session = web.session.Session(app, store)
render = web.template.render("templates")
encoder = GameOutputJSONEncoder()

generators = {}
# Keeps track of which users have visited the index page before
# playing the game, while the server was running.
goodSessions = {}


class Index:
    def GET(self):
        session_id = session.session_id
        if not (session_id in goodSessions):
            goodSessions[session_id] = True
        if session_id in generators:
            # Assume the user wants to restart the game
            del generators[session_id]
        return render.index(QUIT)


class Game:
    def POST(self):
        data = web.input(text=None)
        session_id = session.session_id
        gen = None
        if not (session_id in generators):
            output = self._new_game_output(session_id)
            if not ((session_id in goodSessions) or output.error):
                output.error = "We lost track of your progress. \
                    You are starting over, sorry :("
        else:
            gen = generators[session_id]
            try:
                output = gen.send(data.text)
            except StopIteration as err:
                # Game over. Restart
                output = self._new_game_output(session_id)
                if not (output.error):
                    output.error = "Just to be clear, you are starting a new game."

        web.header("Content-Type", "application/json")
        return encoder.encode(output)

    def _new_game_output(self, session_id):
        gen = run_game()
        generators[session_id] = gen
        return next(gen)


def main():
    app.run()


__all__ = [main]
