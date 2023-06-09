import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilter) {
  return (`
  <div class="trip-filters__filter">
      <input
      id="filter-${filter.type}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${filter.type}"
      ${filter.type === currentFilter ? 'checked' : ''} ${(filter.count === 0) ? 'disabled="true"' : ''}>
      <label class="trip-filters__filter-label"
      for="filter-${filter.type}">${filter.name}</label>
  </div>`
  );
}


function createFiltersTemplate(filterItems, currentFilter) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilter))
    .join('');
  return (`
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class Filters extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);

  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
