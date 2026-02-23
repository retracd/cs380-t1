1. When you type inside of the `<textarea>` because we are utilizing Vue's `v-model` directive.
    `v-model` has two-way binding, meaning when the object is edited in code, it is reflected on
    the page, and when edited on the webpage, the object is literally edited in Vue's engine. 
    Because of Vue's reactivity, this happens automatically. Since when a stickie is edited, that
    part of the DOM is automatically re-rendered, `charCount()` is re-called and so the character
    count is updated.

2. `deep: true` indicates to Vue that it needs to not just look at the `stickies` array, but also
    look *inside* it. Without `deep: true`, Vue would only notice if the array was replaced or if
    items were added or removed from the array, but *not* if already existing items were edited. If
    `deep: true` were to be removed, `this.saveToStorage()` would not automatically be called every
    time a note was updated, thus eliminating our auto-saving functionality.

3. `localStorage` can only store data as Strings. `JSON.stringify()` "serializes" our `stickies`
    array by converting it into a JSON-formatted string. This way, the browser can save our array
    when it otherwise couldn't. If we forgot to call `JSON.parse()` on browser load, the JSON
    string would never be interpreted and converted back into the `stickies` array, likely causing
    most of our methods to crash, and for any stored stickies to not be correctly loaded.

4. `.filter()` returns a *new* array containing only the items for which the predicate is true. In
    this case, that means all the notes except the one we want deleted. We need to re-assing this
    filtered array back to `this.stickies` to actually save the deletion, and for Vue's reactivity
    to notice that we changed (replaced) the array to trigger the UI update. We use `!==` and not 
    `==` or `===` because we want to keep all stickies with an ID that *doesn't* match the note
    being deleted. Effectively only removing the stickie with the matching ID.

5. Implementing `saveToStorage()` as a separate method is better than putting the code directly in
    the watcher because it follows the DRY (or "Don't Repeat Yourself") principle. 