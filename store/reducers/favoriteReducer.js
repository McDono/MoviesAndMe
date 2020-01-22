const initialState = { favoriteFilms: [] };

export default function toggleFavorite(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const filmIndex = state.favoriteFilms.findIndex(
        item => item.id === action.value.id
      );
      if (filmIndex !== -1) {
        //film already in favs
        nextState = {
          ...state,
          favoriteFilms: state.favoriteFilms.filter(
            (item, index) => index !== filmIndex
          )
        };
      } else {
        //film not in favs yet
        nextState = {
          ...state,
          favoriteFilms: [...state.favoriteFilms, action.value]
        };
      }
      return nextState || state;
    default:
      return state;
  }
}
