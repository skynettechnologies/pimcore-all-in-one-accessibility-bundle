pimcore.registerNS("pimcore.plugin.adapimcore");

pimcore.plugin.adapimcore = Class.create({

    getClassName: function () {
        return "pimcore.plugin.adapimcore";
    },

    initialize: function () {
        console.log("initialize triggered"); // Debug line
        const eventToUse = pimcore.events.preMenuBuild ? pimcore.events.preMenuBuild : pimcore.events.pimcoreReady;
        document.addEventListener(eventToUse, this.handleMenuBuild.bind(this));

        // Permissions handling
        document.addEventListener("pimcore.perspectiveEditor.permissions.structure.load", this.handlePermissionsStructureLoad.bind(this));
        document.addEventListener("pimcore.perspectiveEditor.permissions.load", this.handlePermissionsLoad.bind(this));
    },

    handleMenuBuild: function (e) {
        console.log("handleMenuBuild triggered"); // Debug line
        const perspectiveCfg = pimcore.globalmanager.get("perspective");
        if (!perspectiveCfg.inToolbar("adapimcore")) {
            return;
        }

        let menu = e.detail.menu;

        // Add or update the menu item
        menu.adapimcore = {
            label: t('plugin_accessbility_mainmenu'),
            iconCls: 'pimcore_main_nav_icon_ada_map',
            priority: 55,
            shadow: false,
            handler: this.openAdapimcore.bind(this), // Bind context here
            cls: "pimcore_navigation_flyout",
            noSubmenus: true
        };
    },

    handlePermissionsStructureLoad: function (e) {
        if (e.detail.context === 'toolbar') {
            e.detail.structure['adapimcore'] = {};
        }
    },

    handlePermissionsLoad: function (e) {
        const { context, menu, permissions } = e.detail;
        if (context === 'toolbar' && menu === 'adapimcore') {
            if (!permissions[context]) {
                permissions[context] = {};
            }
            if (!permissions[context][menu]) {
                permissions[context][menu] = [];
            }
            if (permissions[context][menu].indexOf('hidden') === -1) {
                permissions[context][menu].push('hidden');
            }
        }
    },

    openAdapimcore: function () {
        const adaViewPanelId = 'plugin_ada_adasetting';
        console.log(adaViewPanelId);
        return {
            text: t('plugin_ada_adaview'),
            iconCls: 'pimcore_nav_icon_ada',
            hideOnClick: false,
            handler: function () {
                console.log("Menu item clicked"); // Debug line
                try {
                    pimcore.globalmanager.get(adaViewPanelId).activate();
                } catch (e) {
                    console.error("Error activating panel", e); // Debug line
                    pimcore.globalmanager.add(
                        adaViewPanelId,
                        new pimcore.tool.genericiframewindow(
                            adaViewPanelId,
                            '/ada-setting',
                            'pimcore_icon_ada',
                            t('plugin_ada_adaview')
                        )
                    );
                }
            }
        };
    },

    pimcoreReady: function (e) {
        console.log("pimcoreReady triggered"); // Debug line
        const perspectiveCfg = pimcore.globalmanager.get("perspective");
        if (!perspectiveCfg.inToolbar("adapimcore")) {
            return;
        }

        let navEl = Ext.get('pimcore_menu_search').insertSibling(
            `<li id="pimcore_menu_adapimcore" data-menu-tooltip="${t('plugin_accessbility_mainmenu')}" class="pimcore_menu_item pimcore_menu_needs_children">
                <img alt="adapimcore" src="/bundles/adapimcore/icons/accesbility.svg">
            </li>`,
            'before'
        );

        navEl.on('mousedown', () => {
            try {
                pimcore.globalmanager.get("plugin_pimcore_adapimcore_config").activate();
            } catch (e) {
                pimcore.globalmanager.add("plugin_pimcore_adapimcore_config", new pimcore.plugin.adapimcore.config());
            }
        });

        pimcore.helpers.initMenuTooltips();
    }
});

var ADAPimcoreBundlePlugin = new pimcore.plugin.adapimcore();
