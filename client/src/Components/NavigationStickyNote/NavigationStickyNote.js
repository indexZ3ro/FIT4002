import '../../css/navigationStickyNote.css';
import $ from 'jquery';

function StickyNotes() {
    function handleClick(event) {
        var el = $(event.currentTarget);
        // var content = el.children();
        var border = $('<div>').css({
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '0',
          height: '0',
          borderTop: '20px solid transparent',
          borderRight: '20px solid ' + el.css('border-top-color'),
        });
        el.append(border);
        el.css('overflow', 'hidden');
        border.animate({ width: '100%', height: '100%', borderRightWidth: el.outerWidth() }, 500);
      }
    return(
        <div>
            <div className="sticky-note" onClick={handleClick}>
                <h2>Sticky Note</h2>
                <p>Single</p>
            </div>
            <div className="sticky-note pink" onClick={handleClick}>
                <h2>Sticky Note2</h2>
                <p>Single</p>
            </div>
        </div>
    )
}

export default StickyNotes;