import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

const slotVisibility = ['', 'hidden md:block', 'hidden lg:block', 'hidden xl:block'];

function getSlotVisibility(slot, maxVisibleItems) {
  if (maxVisibleItems <= 1) {
    return slot === 0 ? '' : 'hidden';
  }

  if (maxVisibleItems === 2) {
    return slot === 0 ? '' : 'hidden lg:block';
  }

  return slotVisibility[slot] ?? 'hidden';
}

export default function ContentCarousel({
  items,
  renderItem,
  ariaLabel,
  maxVisibleItems = 4,
  gridClassName = 'grid min-w-0 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleItems = useMemo(() => {
    const visibleCount = Math.min(items.length, maxVisibleItems);

    return Array.from({ length: visibleCount }, (_, offset) => {
      const itemIndex = (currentIndex + offset) % items.length;
      return {
        item: items[itemIndex],
        slot: offset,
      };
    });
  }, [currentIndex, items, maxVisibleItems]);

  function goToPrevious() {
    setCurrentIndex((index) => (index === 0 ? items.length - 1 : index - 1));
  }

  function goToNext() {
    setCurrentIndex((index) => (index === items.length - 1 ? 0 : index + 1));
  }

  if (!items.length) {
    return null;
  }

  return (
    <div
      className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className="icon-button bg-blush-100 text-cherry hover:bg-white"
        aria-label="Item anterior"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className={gridClassName}>
        {visibleItems.map(({ item, slot }) => (
          <div
            key={`${item.id}-${slot}`}
            className={`min-w-0 ${getSlotVisibility(slot, maxVisibleItems)}`}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="icon-button bg-blush-100 text-cherry hover:bg-white"
        aria-label="Proximo item"
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <p className="col-span-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-cherry">
        {currentIndex + 1} de {items.length}
      </p>
    </div>
  );
}
