<?php
/*
Plugin Name: Auto Font
Plugin URI:  https://github.com/ronaldaug/auto-font
Description: When Zawgyi & Unicode are in a single page, this plugin will automatically detect and convert it into the choosen font (or default font).
Version:     0.0.3
Author:      RonaldAug
Author URI:  https://github.com/ronaldaug
License:     MIT
*/
if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
};

add_action('wp_enqueue_scripts', 'custom_js_register',10);
function custom_js_register() {
  wp_enqueue_script('knayi-js', 'https://unpkg.com/knayi-myscript@latest/dist/knayi-myscript.min.js', null,null, true);
  wp_enqueue_script( 'auto-correct-font', plugins_url( '/js/min.js', __FILE__ ) );
}

/**
 *  Auto Font Widget Class
 */
class auto_font_widget extends WP_Widget {
    /** constructor -- name this the same as the class above */
    function __construct() {
        parent::__construct(false, $name = 'Auto Font - Select Box');	
    }
    /** @see WP_Widget::widget -- do not rename this */
    function widget($args, $instance) {	
        extract( $args );
        $title 		= apply_filters('widget_title', $instance['title']);
        $default_font 	= $instance['default_font'];
        ?>
              <?php echo $before_widget; ?>
                <?php if ( $title ) { echo $before_title . $title . $after_title; } ?>
                <select id="auto-font" value="<?php echo $default_font; ?>" style="width:100%;">
                    <option value="uni">Unicode</option>
                    <option selected="selected" value="zaw">Zawgyi</option> 
               </select>
              <?php echo $after_widget; ?>
        <?php
    }

    /** @see WP_Widget::update -- do not rename this */
    function update($new_instance, $old_instance) {		
		$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['default_font'] = strip_tags($new_instance['default_font']);
        return $instance;
    }

    /** @see WP_Widget::form -- do not rename this */
    function form($instance) {	
        $title 		= esc_attr($instance['title']);
        $default_font	= esc_attr($instance['default_font']);
        ?>
         <p>
          <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:'); ?></label> 
          <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" />
        </p>
		<p>
        <label for="<?php echo $this->get_field_id('default_font'); ?>"><?php _e('Default font'); ?></label> 
  <select id="<?php echo $this->get_field_id('default_font'); ?>" name="<?php echo $this->get_field_name('default_font'); ?>" class="widefat" style="width:100%;">
    <option <?php selected( $instance['default_font'], 'uni'); ?> value="uni">Unicode</option>
    <option <?php selected( $instance['default_font'], 'zaw'); ?> value="zaw">Zawgyi</option> 
</select>
        </p>
        <?php 
    }
} // end class auto_font_widget
add_action('widgets_init', function() { return register_widget("auto_font_widget"); } );
