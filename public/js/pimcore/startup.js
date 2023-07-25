pimcore.registerNS("pimcore.plugin.ADAPimcoreBundle");

pimcore.plugin.adapimcore = Class.create({


    getClassName: function () {
        return "pimcore.plugin.adapimcore";
    },

    initialize: function () {
        // if the new event exists, we use this
        if (pimcore.events.preMenuBuild) {
            document.addEventListener(pimcore.events.preMenuBuild, this.preMenuBuild.bind(this));
        } else {
            document.addEventListener(pimcore.events.pimcoreReady, this.pimcoreReady.bind(this));
        }
        document.addEventListener("pimcore.perspectiveEditor.permissions.structure.load", (e) => {
            if (e.detail.context === 'toolbar') {
                e.detail.structure['adapimcore'] = {};
            }
        });

        document.addEventListener("pimcore.perspectiveEditor.permissions.load", (e) => {
            const context = e.detail.context;
            const menu = e.detail.menu;
            const permissions = e.detail.permissions;

            if (context === 'toolbar' && menu === 'adapimcore') {
                if (permissions[context][menu] === undefined) {
                    permissions[context][menu] = [];
                }
                if (permissions[context][menu].indexOf('hidden') === -1) {
                    permissions[context][menu].push('hidden');
                }
            }
        });
    },

    preMenuBuild: function (e) {
        const perspectiveCfg = pimcore.globalmanager.get("perspective");

        if (perspectiveCfg.inToolbar("adapimcore") === false) {
            return
        }

        let menu = e.detail.menu;

        menu.adapimcore = {
            label: t('plugin_accessbility_mainmenu'),
            iconCls: 'pimcore_main_nav_icon_ada_map',
            priority: 55,
            shadow: false,
            handler: this.openAdapimcore(),
            cls: "pimcore_navigation_flyout",
            noSubmenus: true
        };
    },

    openAdapimcore: function() {
        var adaViewPanelId = 'plugin_ada_adasetting';
        console.info(adaViewPanelId);
        return {
            text: t('plugin_ada_adaview'),
            iconCls: 'pimcore_nav_icon_ada',
            hideOnClick: false,
            handler: function() {
                try {
                    pimcore.globalmanager.add(
                        adaViewPanelId,
                        new pimcore.tool.genericiframewindow(
                            adaViewPanelId,
                            '/admin/adapimcore/config/list',
                            'pimcore_icon_ada',
                            t('plugin_ada_adaview')
                        )
                    );
                } catch (e) {
                    pimcore.globalmanager.add(
                        adaViewPanelId,
                        new pimcore.tool.genericiframewindow(
                            adaViewPanelId,
                            '/admin/adapimcore/config/list',
                            'pimcore_icon_ada',
                            t('plugin_ada_adaview')
                        )
                    );
                }
            }
        };
    },

    pimcoreReady: function(e) {
        const perspectiveCfg = pimcore.globalmanager.get("perspective");

        if (perspectiveCfg.inToolbar("adapimcore") === false) {
            return
        }

        const user = pimcore.globalmanager.get("user");
        let navEl = Ext.get('pimcore_menu_search').insertSibling('<li id="pimcore_menu_adapimcore" data-menu-tooltip="'
            + t('plugin_accessbility_mainmenu') +
            '" class="pimcore_menu_item pimcore_menu_needs_children"><img alt="adapimcore" src="/bundles/adapimcore/icons/accesbility.svg"></li>', 'before');

        navEl.on('mousedown', function () {
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
