from json import JSONEncoder
from ..game_logic.game import GameOutput


class GameOutputJSONEncoder(JSONEncoder):
    def __init__(self):
        super(GameOutputJSONEncoder, self).__init__(sort_keys=True)

    def default(self, obj):
        if isinstance(obj, GameOutput):
            d = dict()
            if obj.instruction:
                d["instruction"] = obj.instruction
            if obj.expression:
                d["expression"] = obj.expression
            if obj.error:
                d["error"] = obj.error
            if obj.score:
                d["score"] = obj.score
            return d
        else:
            return super(GameOutputJSONEncoder, self).default(self, obj)
