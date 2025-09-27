<?php
/**
 * Plugin Name: Needs Assessor
 * Description: A simple plugin to create needs assessment forms with a shortcode.
 * Version: 1.0
 * Author: Thomas Løwe Hansen
 */

// Security measure: Deny direct access to the file.
if (!defined('ABSPATH')) {
    exit;
}

// Function that enqueues CSS and JavaScript.
function needs_assessor_enqueue_scripts() {
    // Ensure scripts are only loaded when the shortcode is in use.
    if (is_a(get_post(get_the_ID()), 'WP_Post') && has_shortcode(get_post(get_the_ID())->post_content, 'internet_needs_assessor')) {
        wp_enqueue_style(
            'needs-assessor-style',
            plugin_dir_url(__FILE__) . 'assessor-style.css',
            [],
            '1.0'
        );
        wp_enqueue_script(
            'needs-assessor-script',
            plugin_dir_url(__FILE__) . 'assessor-script.js',
            [],
            '1.0',
            true // Load the script in the footer.
        );
    }
}
add_action('wp_enqueue_scripts', 'needs_assessor_enqueue_scripts');

// Function that defines the shortcode.
function needs_assessor_shortcode_function() {
    ob_start(); // Start output buffering to capture the HTML.
    include plugin_dir_path(__FILE__) . 'assessor-form.php';
    return ob_get_clean(); // Return the captured HTML.
}
add_shortcode('internet_needs_assessor', 'needs_assessor_shortcode_function');