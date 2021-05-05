/* global $, APP, interfaceConfig */

import { getVerticalFilmstripVisibleAreaWidth, isFilmstripVisible } from '../../../react/features/filmstrip';

const Filmstrip = {
    /**
     * Returns the height of filmstrip
     * @returns {number} height
     */
    getFilmstripHeight() {
        // FIXME Make it more clear the getFilmstripHeight check is used in
        // horizontal film strip mode for calculating how tall large video
        // display should be.
        if (isFilmstripVisible(APP.store) && !interfaceConfig.VERTICAL_FILMSTRIP) {
            return $('.filmstrip').outerHeight();
        }

        return 0;
    },

    /**
     * Returns the width of the vertical filmstip if the filmstrip is visible and 0 otherwise.
     *
     * @returns {number} - The width of the vertical filmstip if the filmstrip is visible and 0 otherwise.
     */
    getVerticalFilmstripWidth() {
        return isFilmstripVisible(APP.store) ? getVerticalFilmstripVisibleAreaWidth() : 0;
    },

    /**
     * Resizes thumbnails for tile view.
     *
     * @param {number} width - The new width of the thumbnails.
     * @param {number} height - The new height of the thumbnails.
     * @param {boolean} forceUpdate
     * @returns {void}
     */
    resizeThumbnailsForTileView(width, height, forceUpdate = false) {
        const thumbs = this._getThumbs(!forceUpdate);

        // if (thumbs && thumbs.remoteThumbs.length < 2) {
        //     height = height * 1.4
        // }

        const avatarSize = height;
        /// 2;

        if (thumbs.localThumb) {
            thumbs.localThumb.css({
                //overflow: 'hidden',
                'padding-top': '',
                height: `${height}px`,
                'min-height': `${height}px`,
                'min-width': `${height}px`,
                width: `${height}px`,
                border: '4px solid rgb(255 255 255 / 0%)',
                'box-shadow': 'rgb(255 255 255) 0px 0px 0px 4px',
                'border-radius': `50%`,
                'margin-right': '25px',
                'margin-left': '25px',
                // 'margin-bottom': '15px',
            });
        }

        if (thumbs.remoteThumbs) {
            thumbs.remoteThumbs.css({
                //overflow: 'hidden',
                'padding-top': '',
                height: `${height}px`,
                'min-height': `${height}px`,
                'min-width': `${height}px`,
                width: `${height}px`,
                border: '4px solid rgb(255 255 255 / 0%)',
                'box-shadow': 'rgb(255 255 255) 0px 0px 0px 4px',
                'border-radius': `50%`,
                'margin-right': '25px',
                'margin-left': '25px',
                //'margin-bottom': '15px',
            });
        }

        $('.avatar-container').css({
            height: `100%`,
            width: `100%`,
        });
    },

    /**
     * Resizes thumbnails for horizontal view.
     *
     * @param {Object} dimensions - The new dimensions of the thumbnails.
     * @param {boolean} forceUpdate
     * @returns {void}
     */
    resizeThumbnailsForHorizontalView({ local = {}, remote = {} }, forceUpdate = false) {
        const thumbs = this._getThumbs(!forceUpdate);

        if (thumbs.localThumb) {
            const { height, width } = local;
            const avatarSize = height;
            /// 2;

            thumbs.localThumb.css({
                //overflow: 'hidden',
                'padding-top': '',
                height: `${height}px`,
                'margin-left': '0px',
                'margin-right': '0px',
                'min-height': `${height}px`,
                'min-width': `${height}px`,
                width: `${height}px`,
                border: '4px solid rgb(255 255 255 / 0%)',
                'box-shadow': 'rgb(255 255 255) 0px 0px 0px 4px',
                'border-radius': `50%`,
            });
            $('#localVideoContainer > .avatar-container').css({
                height: `100%`,
                width: `100%`,
            });
        }

        if (thumbs.remoteThumbs) {
            const { height, width } = remote;
            const avatarSize = height;
            /// 2;

            thumbs.remoteThumbs.css({
                //overflow: 'hidden',
                'padding-top': '',
                height: `${height}px`,
                'min-height': `${height}px`,
                'min-width': `${height}px`,
                width: `${height}px`,
                'margin-left': '0px',
                'margin-right': '0px',
                border: '4px solid rgb(255 255 255 / 0%)',
                'box-shadow': 'rgb(255 255 255) 0px 0px 0px 4px',
                'border-radius': `50%`,
            });
            $('#filmstripRemoteVideosContainer > span > .avatar-container').css({
                height: `100%`,
                width: `100%`,
            });
        }
    },

    /**
     * Resizes thumbnails for vertical view.
     *
     * @returns {void}
     */
    resizeThumbnailsForVerticalView() {
        const thumbs = this._getThumbs(true);

        if (thumbs.localThumb) {
            const heightToWidthPercent = 100 / interfaceConfig.LOCAL_THUMBNAIL_RATIO;

            thumbs.localThumb.css({
                'padding-top': `${heightToWidthPercent}%`,
                width: '',
                height: '',
                'min-width': '',
                'min-height': '',
                'margin-bottom': '5px',
                'margin-left': '0px',
                'margin-right': '0px',
                border: '2px solid rgb(255 255 255)',
                'box-shadow': 'rgb(255 255 255) 0px 0px 0px 0px',
            });
            $('#localVideoContainer > .avatar-container').css({
                height: '100%',
                width: `100%`
            });
        }

        if (thumbs.remoteThumbs) {
            const heightToWidthPercent = 100 / interfaceConfig.REMOTE_THUMBNAIL_RATIO;

            thumbs.remoteThumbs.css({
                'padding-top': `${heightToWidthPercent}%`,
                width: '',
                height: '',
                'min-width': '',
                'min-height': '',
                border: '2px solid rgb(255 255 255)',
                'box-shadow': 'rgb(255 255 255) 0px 0px 0px 0px',
                'margin-bottom': '5px',
                'margin-left': '0px',
                'margin-right': '0px',
            });
            $('#filmstripRemoteVideosContainer > span > .avatar-container').css({
                height: `100%`,
                width: `100%`,
            });
        }
    },

    /**
     * Returns thumbnails of the filmstrip
     * @param onlyVisible
     * @returns {object} thumbnails
     */
    _getThumbs(onlyVisible = false) {
        let selector = 'span';

        if (onlyVisible) {
            selector += ':visible';
        }

        const localThumb = $('#localVideoContainer');
        const remoteThumbs = $('#filmstripRemoteVideosContainer').children(selector);

        // Exclude the local video container if it has been hidden.
        if (localThumb.hasClass('hidden')) {
            return { remoteThumbs };
        }

        return {
            remoteThumbs,
            localThumb
        };

    }
};

export default Filmstrip;
