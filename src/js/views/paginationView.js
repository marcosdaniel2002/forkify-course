import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButtons(curPage, 'right');
    }

    // Last page
    if ((curPage === numPages) & (numPages > 1)) {
      return this._generateMarkupButtons(curPage, 'left');
    }
    // Other pages
    if (curPage < numPages) {
      return (
        this._generateMarkupButtons(curPage, 'left') +
        this._generateMarkupButtons(curPage, 'right')
      );
    }
    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButtons(page, direction) {
    if (direction === 'right') {
      return `
        <button class="btn--inline pagination__btn--next" data-goto="${
          page + 1
        }">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
    if (direction === 'left') {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto="${
          page - 1
        }">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
        </button>
        `;
    }
  }
}

export default new PaginationView();
