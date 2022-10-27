package com.kuragari.wc202223;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.utils.ScreenUtils;

import com.badlogic.gdx.graphics.OrthographicCamera;

import com.badlogic.gdx.Input.Keys;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer.ShapeType;

import com.badlogic.gdx.math.Rectangle;
import com.kuragari.wc202223.components.Character;
import com.kuragari.wc202223.components.ComponentManager;
import com.kuragari.wc202223.components.Floor;
import com.kuragari.wc202223.helpers.Collision;
import com.kuragari.wc202223.helpers.CollisionDirection;

import java.security.Key;

public class Game extends ApplicationAdapter {
	ShapeRenderer shapeRenderer;
	private OrthographicCamera camera;
	private ComponentManager cm;

	@Override
	public void create () {
		shapeRenderer = new ShapeRenderer();
		camera = new OrthographicCamera();
		camera.setToOrtho(false, 800, 480);

		cm = new ComponentManager();
		cm.setMainCharacter( new Character(300, 150 ) );
		//cm.addFloor( new Floor(10, 10, 60, 5, "#FFFFFF"));
		cm.addFloor( new Floor(200, 200, 60, 5, "#001199"));
	}

	@Override
	public void render () {
		ScreenUtils.clear(1, 0, 0, 1);

		String event = "None";
		String target = "";
		if( Gdx.input.isKeyPressed( Keys.UP ) || Gdx.input.isKeyPressed( Keys.W ) ) {
			event = "KeyUp";
		}
		if( Gdx.input.isKeyPressed( Keys.DOWN ) || Gdx.input.isKeyPressed( Keys.S ) ){
			event = "KeyDown";
		}
		if( Gdx.input.isKeyPressed( Keys.LEFT ) || Gdx.input.isKeyPressed( Keys.A ) ) {
			event = "KeyLeft";
		}
		if( Gdx.input.isKeyPressed( Keys.RIGHT ) || Gdx.input.isKeyPressed( Keys.D ) ) {
			event = "KeyRight";
		}

		try {
			Collision impact = cm.checkCollision();
			cm.updateElements( event, impact );
			cm.drawElements( shapeRenderer );
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	@Override
	public void dispose () { }
}
