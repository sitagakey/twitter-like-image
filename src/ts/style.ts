import * as CSS from 'csstype';

export type StyleObject = {
    [key: string]: CSS.Properties;
};

export const style: StyleObject = {
    '.twitter-like-image': {
        width: '100%',
        borderRadius: '20px',
        position: 'relative',
        overflow: 'hidden',
    },
    '.twitter-like-image.is-transitionend .backdrop-content': {
        transition: '0.4s cubic-bezier(0.33, 0.98, 0.77, 0.98)',
    },
    '.twitter-like-image::before': {
        content: "''",
        display: 'block',
        width: '100%',
        paddingTop: '50%',
    },
    '.content': {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '0',
        top: '0',
        gridGap: '4px',
        listStyle: 'none',
        margin: '0',
        padding: '0',
    },
    '.item': {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    '.item:nth-last-child(1)': {
        gridColumn: '1/3',
        gridRow: '1/3',
    },
    '.item:nth-last-child(2)': {
        gridColumn: '1',
        gridRow: '1/3',
    },
    '.item:nth-last-child(2) + .item': {
        gridColumn: '2',
        gridRow: '1/3',
    },
    '.item:nth-last-child(3)': {
        gridColumn: '1',
        gridRow: '1',
    },
    '.item:nth-last-child(3) + .item': {
        gridColumn: '1',
        gridRow: '2',
    },
    '.item:nth-last-child(3) + .item + .item': {
        gridColumn: '2',
        gridRow: '1/3',
    },
    '.item:nth-last-child(4)': {
        gridColumn: '1/2',
        gridRow: '1/2',
    },
    '.item:nth-last-child(4) + .item': {
        gridColumn: '2/3',
        gridRow: '1/2',
    },
    '.item:nth-last-child(4) + .item + .item': {
        gridColumn: '1/2',
        gridRow: '2/3',
    },
    '.item:nth-last-child(4) + .item + .item + .item': {
        gridColumn: '2/3',
        gridRow: '2/3',
    },
    '.item img': {
        width: '100%',
        height: '100%',
        display: 'block',
        objectFit: 'cover',
    },
    '.backdrop': {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.7)',
        transition: 'opacity 0.2s, visibility 0.2s',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: 100,
    },
    '.backdrop.is-hide': {
        opacity: '0',
        visibility: 'hidden',
    },
    '.backdrop-content': {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        listStyle: 'none',
        margin: '0',
        padding: '0',
    },
    '.backdrop-item': {
        display: 'flex',
        height: '100%',
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    '.backdrop-item img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    '.backdrop-caption': {
        minHeight: '80px',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        bottom: '0',
        left: '0',
        padding: '10px 15px',
        color: 'white',
        boxSizing: 'border-box',
        margin: '0',
    },
    '.backdrop-next,.backdrop-prev': {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: '10px',
        paddingRight: '10px',
        position: 'absolute',
        top: '0',
        border: '0',
        background: 'transparent',
        overflow: 'hidden',
    },
    '.backdrop-next.is-hide,.backdrop-prev.is-hide': {
        display: 'block',
    },
    '.backdrop-next:focus,.backdrop-prev:focus': {
        outline: 'none',
    },
    '.backdrop-next:focus::before,.backdrop-prev:focus::before': {
        border: '2px solid rgba(255, 255, 255, 0.4)',
    },
    '.backdrop-next:hover::before,.backdrop-prev:hover::before': {
        background: 'rgba(255, 255, 255, 0.1)',
    },
    '.backdrop-next::before,.backdrop-prev::before': {
        content: "''",
        display: 'block',
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        background: 'rgba(0, 0, 0, 0.1)',
        transition: '0.3s',
        border: '2px solid transparent',
    },
    '.backdrop-next::after,.backdrop-prev::after': {
        content: "''",
        display: 'block',
        width: '8px',
        height: '8px',
        position: 'absolute',
        top: 'calc(50% - 5px)',
    },
    '.backdrop-prev': {
        left: '0',
    },
    '.backdrop-prev::after': {
        borderLeft: '2px solid rgba(255, 255, 255, 0.6)',
        borderTop: '2px solid rgba(255, 255, 255, 0.6)',
        transform: 'rotate(-45deg)',
        right: 'calc(50% - 6px)',
    },
    '.backdrop-next': {
        right: '0',
    },
    '.backdrop-next::after': {
        borderTop: '2px solid rgba(255, 255, 255, 0.6)',
        borderRight: '2px solid rgba(255, 255, 255, 0.6)',
        transform: 'rotate(45deg)',
        left: 'calc(50% - 6px)',
    },
    '.backdrop-close': {
        display: 'block',
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        background: 'rgba(0, 0, 0, 0.1)',
        position: 'absolute',
        overflow: 'hidden',
        top: '20px',
        left: '10px',
        transition: '0.3s',
        border: '2px solid transparent',
    },
    '.backdrop-close:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
    },
    '.backdrop-close:focus': {
        outline: 'none',
        border: '2px solid rgba(255, 255, 255, 0.4)',
    },
    '.backdrop-close::before,.backdrop-close::after': {
        content: "''",
        display: 'block',
        width: '16px',
        height: '2px',
        background: 'rgba(255, 255, 255, 0.6)',
        position: 'absolute',
        top: 'calc(50% - 1px)',
        left: 'calc(50% - 8px)',
    },
    '.backdrop-close::before': {
        transform: 'rotate(45deg)',
    },
    '.backdrop-close::after': {
        transform: 'rotate(-45deg)',
    },
};
