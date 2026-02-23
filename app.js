Vue.createApp({
  data() {
    return {
      stickies: [],
      storageKey: "sticky-notes-simple",
    };
  },

  mounted() {
    this.loadFromStorage();
  },

  methods: {
    addStickie() {
      // Creates a new stickie with a random UUID if possible, else uses datetime + random permutation
      const newStickie = {
        id: crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now() * 100000 + Math.random() * 100000),
        text: "",
      };

      this.stickies.push(newStickie);
    },

    deleteStickie(id) {
      // Deletes stickie using Array.filter(), filtering a on a predicate using !id
      this.stickies = this.stickies.filter((s) => s.id != id);
    },

    clearAll() {
        // Deletes all stored stickies from session and storage
        if (confirm("Clear all notes?")) {
            this.stickies = [];
            localStorage.removeItem(this.storageKey);
        }
    },

    charCount(text) {
      return (text ?? "").length;
    },

    saveToStorage() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.stickies));
    },

    loadFromStorage() {
      const saved = localStorage.getItem(this.storageKey);
      this.stickies = saved ? JSON.parse(saved) : [];
    },
  },

  watch: {
    stickies: {
      handler() {
        this.saveToStorage();
      },
      deep: true,
    },
  },
}).mount("#app");
