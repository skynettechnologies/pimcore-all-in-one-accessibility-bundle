pimcore.registerNS("pimcore.plugin.adapimcore.config");
pimcore.plugin.adapimcore.config = Class.create({

    importRoute: "/admin/adapimcore/config/import",
    exportRoute: "/admin/adapimcore/config/export",
    pimcoreReady: function(e) {
        this.navEl = Ext.get('pimcore_menu_search').insertSibling('<li id="pimcore_menu_cmf" data-menu-tooltip="' +
            t('plugin_cmf_mainmenu') +
            '" class="pimcore_menu_item pimcore_menu_needs_children"><img src="/bundles/pimcorecustomermanagementframework/icons/outline-group-24px.svg"></li>', 'before');
        this.menu = new Ext.menu.Menu({
            cls: 'pimcore_navigation_flyout'
        });

        pimcore.layout.toolbar.prototype.cmfMenu = this.menu;
        this.initToolbar();
        this.initNewsletterQueueInfo();

    },
    initialize: function () {
        let adaMenu=this.initADAPackage();
        this.menu.add(adaMenu);
    },
    initADAPackage:function (){
            var adaViewPanelId = 'plugin_ada_adasetting';
            console.info(t('plugin_ada_adaview'));
            return {
                text: t('plugin_ada_adaview'),
                iconCls: 'pimcore_nav_icon_ada',
                hideOnClick: false,
                handler: function() {
                    try {
                        pimcore.globalmanager.get(adaViewPanelId).activate();
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
    }


});