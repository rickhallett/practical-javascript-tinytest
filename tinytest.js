/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */
var TinyTest = {

    run: function (tests) {
        var errorStyles = [
            , 'color: red'
            , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
            , 'text-align: center'
            , 'font-weight: bold'
        ].join(';');

        var successStyles = [
            , 'color: green'
            , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
            , 'text-align: center'
            , 'font-weight: bold'
        ].join(';')

        var failures = 0;
        var successes = 0;
        var testMessageLog = [];
        for (var testName in tests) {
            var testAction = tests[testName];
            try {
                testAction.apply(this);
                testMessageLog.push(['Test:', testName, 'OK']);
                success++
            } catch (e) {
                failures++;
                testMessageLog.push(['Test:', testName, 'FAILED', e]);
                // console.error(e.stack);
            }
        }
        setTimeout(function () { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
                console.log('%c *** Practical Javascript - Test Driven Development ***', 'color: white');
                testMessageLog.forEach(function (message, index) {
                    if (message[2] === 'FAILED') {
                        console.log(`%c ${message[0]}  ${message[1]} => ${message[2]} ${message[3]}`, errorStyles);
                    } else {
                        console.log(`%c ${message[0]}  ${message[1]} => ${message[2]}`, successStyles);
                    }
                });
            }
        }, 0);
    },

    fail: function (msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function (value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function (expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function (expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

var fail = TinyTest.fail.bind(TinyTest),
    assert = TinyTest.assert.bind(TinyTest),
    assertEquals = TinyTest.assertEquals.bind(TinyTest),
    eq = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests = TinyTest.run.bind(TinyTest);