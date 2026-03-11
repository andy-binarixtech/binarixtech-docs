const getRandomUserId = (() => {
  let availableIds = [...G_USER_IDS];

  return () => {
    if (availableIds.length === 0) {
      availableIds = [...G_USER_IDS];
    }
    const randomIndex = Math.floor(Math.random() * availableIds.length);
    const selectedId = availableIds.splice(randomIndex, 1)[0];
    return selectedId;
  };
})();
