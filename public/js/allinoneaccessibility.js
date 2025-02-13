document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loader');
    // Function to show loader
    function showLoader() {
        loader.style.display = 'flex';
    }
    // Function to hide loader
    function hideLoader() {
        loader.style.display = 'none';
    }
    // Function to populate form fields dynamically from fetched settings
    function setWidgetData(widgetPosition, widgetColor, iconType, iconSize, widgetSize, widgetIconSizeCustom, is_widget_custom_size, is_widget_custom_position, widgetPositionTop, widgetPositionBottom, widgetPositionLeft, widgetPositionRight) {
        if (widgetColor) {
            const colorInput = document.getElementById("color");
            colorInput.value = widgetColor;
        }
        if (widgetPosition) {
            const positionRadio = document.querySelector(`.aioa-position[value="${widgetPosition}"]`);
            if (positionRadio) {
                positionRadio.checked = true;
            }
        }
        if (iconType) {
            const iconTypeMapped = `aioa-icon-type-${iconType}`;  // Mapping to the full string (e.g., aioa-icon-type-29)
            const iconRadio = document.querySelector(`.icon_type[value="${iconTypeMapped}"]`);
            if (iconRadio) {
                iconRadio.checked = true;
                const iconImg = `https://www.skynettechnologies.com/sites/default/files/${iconTypeMapped}.svg`;
                $(".iconimg").attr("src", iconImg);  // Update icon image based on iconType
                console.log(iconImg);  // Optional: For debugging
            } else {
                console.error('Icon type radio not found for:', iconTypeMapped);
            }
        }

        // Set Icon Size - Mapping numeric values to string values
        let iconSizeMapped = '';
        if (iconSize === 1) {
            iconSizeMapped = 'aioa-extra-small-icon'; // If iconSize is 1, map it to 'aioa-extra-small-icon'
        } else if (iconSize === 2) {
            iconSizeMapped = 'aioa-small-icon'; // If iconSize is 2, map it to 'aioa-small-icon'
        } else if (iconSize === 3) {
            iconSizeMapped = 'aioa-default-icon'; // If iconSize is 3, map it to ''
        } else if (iconSize === 4) {
            iconSizeMapped = 'aioa-medium-icon'; // If iconSize is 4, map it to ''
        } else if (iconSize === 5) {
            iconSizeMapped = 'aioa-big-icon'; // If iconSize is 5, map it to 'aioa-default-icon'
        } else {
            console.error('Invalid iconSize value:', iconSize);  // Optional: Debugging
        }

        // Set Icon Size - Use the mapped string value
        if (iconSizeMapped) {
            const iconSizeRadio = document.querySelector(`.aioa-iconsize[value="${iconSizeMapped}"]`);
            if (iconSizeRadio) {
                iconSizeRadio.checked = true;
            } else {
                console.error('Icon size radio not found for:', iconSizeMapped);
            }
        }
        // Set Horizontal Position: Left / Right
        if (widgetPositionLeft !== undefined && widgetPositionLeft !== "") {
            const positionHorizontal = document.querySelector('[name="aioa_custom_position_horizontal"]');
            if (positionHorizontal) {
                positionHorizontal.value = widgetPositionLeft;
            }

            const positionHorizontalType = document.querySelector('[name="aioa_custom_position_horizontal_type"]');
            if (positionHorizontalType) {
                positionHorizontalType.value = "left";
            }
        }

        if (widgetPositionRight !== undefined && widgetPositionRight !== "") {
            const positionHorizontal = document.querySelector('[name="aioa_custom_position_horizontal"]');
            if (positionHorizontal) {
                positionHorizontal.value = widgetPositionRight;
            }

            const positionHorizontalType = document.querySelector('[name="aioa_custom_position_horizontal_type"]');
            if (positionHorizontalType) {
                positionHorizontalType.value = "right";
            }
        }

        // Set Vertical Position: Top / Bottom
        if (widgetPositionTop !== undefined && widgetPositionTop !== "") {
            const positionVerticalType = document.querySelector('[name="aioa_custom_position_vertical_type"]');
            if (positionVerticalType) {
                positionVerticalType.value = "top";
            }
            const widgetPositionBottom = document.getElementById('widget_position_bottom');
            if (widgetPositionBottom) widgetPositionBottom.value = "";
        }

        if (widgetPositionBottom !== undefined && widgetPositionBottom !== "") {
            const positionVerticalType = document.querySelector('[name="aioa_custom_position_vertical_type"]');
            if (positionVerticalType) {
                positionVerticalType.value = "bottom";
            }
            const widgetPositionTop = document.getElementById('widget_position_top');
            if (widgetPositionTop) widgetPositionTop.value = "";
        }

        // Select correct option for Horizontal Position (Left or Right)
        if (widgetPositionLeft || widgetPositionRight) {
            const positionHorizontalTypeSelect = document.querySelector('[name="aioa_custom_position_horizontal_type"]');
            if (positionHorizontalTypeSelect) {
                const options = positionHorizontalTypeSelect.querySelectorAll('option');
                options.forEach(option => {
                    if (widgetPositionLeft && option.value === "left") {
                        option.selected = true;
                    }
                    if (widgetPositionRight && option.value === "right") {
                        option.selected = true;
                    }
                });
            }
        }

        // Select correct option for Vertical Position (Top or Bottom)
        if (widgetPositionTop || widgetPositionBottom) {
            const positionVerticalTypeSelect = document.querySelector('[name="aioa_custom_position_vertical_type"]');
            if (positionVerticalTypeSelect) {
                const options = positionVerticalTypeSelect.querySelectorAll('option');
                options.forEach(option => {
                    if (widgetPositionTop && option.value === "top") {
                        option.selected = true;
                    }
                    if (widgetPositionBottom && option.value === "bottom") {
                        option.selected = true;
                    }
                });
            }
        }
        const positionHorizontalTextBox = document.querySelector('[name="aioa_custom_position_horizontal"]');
        if (positionHorizontalTextBox) {
            const positionHorizontalTextBox = document.querySelector('[name="aioa_custom_position_horizontal"]');
            var custom_position_horizontal_type = document.querySelector('select[name="aioa_custom_position_horizontal_type"]').value;
            if(custom_position_horizontal_type=='left'){
                positionHorizontalTextBox.value = widgetPositionLeft;
            }
            else if(custom_position_horizontal_type=='right') {
                positionHorizontalTextBox.value = widgetPositionRight;
            }
        }

        const positionVerticalTextBox = document.querySelector('[name="aioa_custom_position_vertical"]');
        if (positionVerticalTextBox) {
            const positionVerticalTextBox = document.querySelector('[name="aioa_custom_position_vertical"]');
            var custom_position_vertical_type = document.querySelector('select[name="aioa_custom_position_vertical_type"]').value;
            if(custom_position_vertical_type=='bottom'){
                positionVerticalTextBox.value = widgetPositionBottom;
            }
            else if(custom_position_vertical_type=='top') {
                positionVerticalTextBox.value = widgetPositionTop;
            }
        }
        if (widgetIconSizeCustom) {
            const widgetIconSizeCustomRadio = document.querySelector('[name="widget_icon_size_custom"]');
            if (widgetIconSizeCustomRadio) {
                widgetIconSizeCustomRadio.value = widgetIconSizeCustom;
            }
        }
        const customPositionSwitcher = document.getElementById('custom-position-switcher');
        if (customPositionSwitcher) {
            // Check the checkbox if the value is 1, else uncheck it
            customPositionSwitcher.checked = (is_widget_custom_position === 1);
            // Toggle the visibility of custom position fields
            $(".edit-is-widget-custom-position-1").toggleClass("hide", is_widget_custom_position !== 1);
            $(".edit-is-widget-custom-position-0").toggleClass("hide", is_widget_custom_position === 1);
        }

        // Set the 'Enable icon custom size' checkbox
        const customSizeSwitcher = document.getElementById('custom-size-switcher');
        if (customSizeSwitcher) {
            // Check the checkbox if the value is 1, else uncheck it
            customSizeSwitcher.checked = (is_widget_custom_size === 1);
            // Toggle the visibility of custom size fields
            $(".custom-size-controls").toggleClass("hide", is_widget_custom_size !== 1);
            $(".widget-icon").toggleClass("hide", is_widget_custom_size === 1);
        }
    }

    const defaultValues = {
        widgetPosition: 'bottom_right',
        widgetColor: '#420083',
        iconType: 'aioa-icon-type-1',
        iconSize: 'aioa-default-icon',
    };
    const domain_name = window.location.host; //window.location.host;
    if (domain_name && domain_name !== '') {
        // Show loader before fetching data
        showLoader();
        // If domain_name is present, fetch from the external API
        const apiUrl = "https://ada.skynettechnologies.us/api/widget-settings";   // Fetch Widget Data from the Dashboard
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                website_url: domain_name
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse JSON response
            })
            .then((data) => {
                // Extract widget position and other settings from the API response
                const widgetPosition = data.Data?.widget_position || defaultValues.widgetPosition;
                const widgetColor = data.Data?.widget_color_code || defaultValues.widgetColor;
                const iconType = data.Data?.widget_icon_type || defaultValues.iconType;
                const iconSize = data.Data?.widget_icon_size || defaultValues.iconSize;
                const widgetSize = data.Data?.widget_size || defaultValues.widgetSize;
                const widgetIconSizeCustom = data.Data?.widget_icon_size_custom || defaultValues.widgetIconSizeCustom;
                const is_widget_custom_size = data.Data?.is_widget_custom_size || defaultValues.is_widget_custom_size;
                const is_widget_custom_position = data.Data?.is_widget_custom_position || defaultValues.is_widget_custom_position;
                const widgetPositionTop = data.Data?.widget_position_top ?? defaultValues.widgetPositionTop;
                const widgetPositionBottom = data.Data?.widget_position_bottom ?? defaultValues.widgetPositionBottom;
                const widgetPositionLeft = data.Data?.widget_position_left ?? defaultValues.widgetPositionLeft;
                const widgetPositionRight = data.Data?.widget_position_right ?? defaultValues.widgetPositionRight;
                setWidgetData(
                    widgetPosition,
                    widgetColor,
                    iconType,
                    iconSize,
                    widgetSize,
                    widgetIconSizeCustom,
                    is_widget_custom_size,
                    is_widget_custom_position,
                    widgetPositionTop,
                    widgetPositionBottom,
                    widgetPositionLeft,
                    widgetPositionRight
                );
                console.log(data.Data,is_widget_custom_size,is_widget_custom_position);
            })
            .catch((error) => {
                console.error("Error fetching widget position:", error);
            })
            .finally(() => {
                // Hide loader after fetching data is complete (success or error)
                hideLoader();
            });
    }
    else {
        // If domain_name is not valid, set default values
        setWidgetData(
            defaultValues.widgetPosition,
            defaultValues.widgetColor,
            defaultValues.iconType,
            defaultValues.iconSize
        );
    }
    // $('.colorpicker').on('input', function () {
    //     $('.colorint').val(this.value);
    // });
    // $('.colorint').on('input', function () {
    //     $('.colorpicker').val(this.value);
    // });

    $(".icon_type").change(function () {
        var icon_type = $(this).val(); // Get the selected icon type value
        var iconImg = "https://www.skynettechnologies.com/sites/default/files/" + icon_type + ".svg";
        $(".iconimg").attr("src", iconImg); // Update the icon image source
    });

    document.getElementById('form-module').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission behavior
        // Collect form data
        document.getElementById('loader').style.display = 'flex';
        var color = document.getElementById("color").value;
        var positionVal = document.querySelector('.aioa-position:checked').value;
        var icon_typeVal = document.querySelector('.icon_type:checked').value;
        var icon_sizeVal = document.querySelector('.aioa-iconsize:checked').value;

        var custom_position_horizontal = document.querySelector('input[name="aioa_custom_position_horizontal"]').value;
        var custom_position_vertical = document.querySelector('input[name="aioa_custom_position_vertical"]').value;
        var custom_position_horizontal_type = document.querySelector('select[name="aioa_custom_position_horizontal_type"]').value;
        var custom_position_vertical_type = document.querySelector('select[name="aioa_custom_position_vertical_type"]').value;
        var widget_size = document.querySelector('.select-widget-size:checked').value;

        var widget_position_left=(custom_position_horizontal_type==="left")?custom_position_horizontal:"";
        var widget_position_right=(custom_position_horizontal_type==="right")?custom_position_horizontal:"";
        var widget_position_top=(custom_position_vertical_type==="top")?custom_position_vertical:"";
        var widget_position_bottom=(custom_position_vertical_type==="bottom")?custom_position_vertical:"";

        var is_widget_custom_size = document.getElementById("custom-size-switcher") ? document.getElementById("custom-size-switcher").checked ? 1 : 0 : 0;
        var is_widget_custom_position = document.getElementById("custom-position-switcher") ? document.getElementById("custom-position-switcher").checked ? 1 : 0 : 0;
        console.log(is_widget_custom_size,is_widget_custom_position);
        var widget_icon_size_custom = document.getElementById("widget_icon_size_custom") ? document.getElementById("widget_icon_size_custom").value : '';
        var user_name = document.getElementById("user_name").value;  // You could also dynamically set this from JS
        var email = document.getElementById("email").value;

        // console.log('Selected Horizontal (px):', widget_position_left);
        // console.log('Selected Vertical (px):', widget_position_right);
        // console.log('Selected Horizontal Value (px):', widget_position_top);
        // console.log('Selected Vertical Value (px):', widget_position_bottom);

        var  domain_name = window.location.host;//window.location.host;
        var params = new URLSearchParams();
        params.append('u', domain_name);
        params.append('widget_position', positionVal);
        params.append('widget_color_code', color);
        params.append('widget_icon_type', icon_typeVal);
        params.append('widget_icon_size', icon_sizeVal);
        params.append('widget_position_left', widget_position_left);
        params.append('widget_position_top', widget_position_top);
        params.append('widget_position_right', widget_position_right);
        params.append('widget_position_bottom', widget_position_bottom);
        params.append('widget_size', widget_size);
        params.append('is_widget_custom_size', is_widget_custom_size);
        params.append('is_widget_custom_position', is_widget_custom_position);
        params.append('widget_icon_size_custom', widget_icon_size_custom);
        // Send the request using the fetch API to the external API
        const requestOptions = {
            method: "POST",
            body: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Ensure the body is sent as URL-encoded
            },
            redirect: "follow"
        };
        fetch('https://ada.skynettechnologies.us/api/widget-setting-update-platform', requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                // console.log(result);
                if (result && result.status === 'success') {
                    // console.log('Response from external API:', result);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                // Hide the loader after the form is submitted
                document.getElementById('loader').style.display = 'none';
                alert("Widget Settings saved successfully!!!");
            });
    });

    const sizeOptions = document.querySelectorAll('input[name="icon_size"]');
    const sizeOptionsImg = document.querySelectorAll('input[name="icon_size"] + label img');
    const typeOptions = document.querySelectorAll('input[name="icon_type"]');

    sizeOptionsImg.forEach(option2 => {
        var ico_type = document.querySelector('input[name="icon_type"]:checked').value;
        option2.setAttribute("src", "https://www.skynettechnologies.com/sites/default/files/" + ico_type + ".svg");
    });

    typeOptions.forEach(option => {
        option.addEventListener("click", (event) => {
            sizeOptionsImg.forEach(option2 => {
                var ico_type = document.querySelector('input[name="icon_type"]:checked').value;
                option2.setAttribute("src", "https://www.skynettechnologies.com/sites/default/files/" + ico_type + ".svg");
            });
        });
    });

});
