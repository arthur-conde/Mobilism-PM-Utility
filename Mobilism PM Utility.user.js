// ==UserScript==
// @name         Mobilism PM Utility
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Utility to clean up mobilism forum PM inbox
// @author       Arthur Conde
// @match        https://forum.mobilism.org/ucp.php?i=pm*
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';
    // localStorage key
    const key = "accumulator";

    function LoadIdsFromStorage()
    {
        // Retrieve the accumulator from localStorage
        var acc = window.localStorage.getItem(key);
        if (acc == null) {
            // If there isn't one, store an empty array
            acc = [];
            window.localStorage.setItem(key, "[]")
        } else {
            // Deserialize from JSON
            acc = JSON.parse(acc)
        }

        return acc;
    }

    function StoreMessageIds()
    {
        var acc = LoadIdsFromStorage();

        // Find each id and push it into the accumulator
        $("input[name='marked_msg_id[]']").each((k,v) => acc.push($(v).val()));
        // Store the accumulator back in localStorage
        window.localStorage.setItem(key, JSON.stringify(acc));
    }

    function GenerateUI()
    {
        var acc = LoadIdsFromStorage();

        // Generate UI for them to be submitted into the form
        for(var k in acc) {
            $("#viewfolder").append(`<input type="text" name="marked_msg_id[]" value="${acc[k]}"/>`)
        }
        window.localStorage.removeItem(key);
    }

    GM_registerMenuCommand("Store Message Ids", StoreMessageIds, "s");
    GM_registerMenuCommand("Generate UI", GenerateUI, "g");

})();
