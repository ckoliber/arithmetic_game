$(function() {

    var input = $('#next > input');
    var btn = $('#next > button');
    var instructionDiv = $('#instruction');
    var instruction = $('#instruction > p');
    var expressionDiv = $('#expression');
    var expression = $('#expression > p');
    var scoreDiv = $('#score');
    var errorDiv = $('#error');

    var nextResultCb = function(data) {
        if(typeof data.instruction === 'string') {
            instruction.text(data.instruction);
            instructionDiv.show();
        } else {
            instructionDiv.hide();
        }
        if(typeof data.expression === 'string') {
            expression.html(data.expression);
            expressionDiv.show();
            if(typeof data.score !== 'string' && typeof data.instruction !== 'string') {
                input.val("");
                input.show();
                // This allows the user to start typing immediately,
                // as the field is selected.
                input.focus();
            } else {
                input.hide();
            }
        } else {
            expressionDiv.hide();
            input.hide();
        }
        if(typeof data.error === 'string') {
            errorDiv.text(data.error);
            errorDiv.show();
        } else {
            errorDiv.hide();
        }
        if(typeof data.score === 'string') {
            scoreString = ""
            components = data.score.split('\n');
            for(i = 0; i < components.length; ++i) {
                scoreString += "<p>" + components[i] + "</p>"
            }
            scoreDiv.html(scoreString);
            scoreDiv.show();
            input.hide();
        } else {
            scoreDiv.hide();
        }
    };

    var inputSubmitAction = function() {
        $.ajax({
            type: "POST",
            url: '/game',
            data: {text: input.val()},
            error: function(jqXHR, textStatus, errorThrown) {
                errorDiv.text("There was a problem communicating your request. "+
                    errorThrown);
                errorDiv.show();
            },
            success: nextResultCb,
            dataType: "json"
        });
    };

    btn.on('click', inputSubmitAction);
    input.on('keydown', function(event) {
        if(event.key === "Enter") {
            inputSubmitAction();
        }
    });
});
