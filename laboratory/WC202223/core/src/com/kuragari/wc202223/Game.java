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
public class Game extends ApplicationAdapter {
	SpriteBatch batch;
	Texture img;

	ShapeRenderer shapeRenderer;
	private OrthographicCamera camera;

	int x = 100;
	int y = 100;
	
	@Override
	public void create () {
		batch = new SpriteBatch();
		img = new Texture("badlogic.jpg");

		shapeRenderer = new ShapeRenderer();
		camera = new OrthographicCamera();
		camera.setToOrtho(false, 800, 480);
	}

	@Override
	public void render () {
		ScreenUtils.clear(1, 0, 0, 1);
		//batch.begin();
		//batch.draw(img, 0, 0);
		//batch.end();

		shapeRenderer.setColor(Color.BLACK);
		shapeRenderer.begin(ShapeType.Filled);
		shapeRenderer.circle(x, y, 32);
		shapeRenderer.end();


		if(Gdx.input.isKeyPressed(Keys.UP)) {
			y += 200 * Gdx.graphics.getDeltaTime();
		}
		if(Gdx.input.isKeyPressed(Keys.DOWN)){
			y -= 200 * Gdx.graphics.getDeltaTime();
		}

		if(Gdx.input.isKeyPressed(Keys.LEFT)) {
			x -= 200 * Gdx.graphics.getDeltaTime();
		}
		if(Gdx.input.isKeyPressed(Keys.RIGHT)){
			x += 200 * Gdx.graphics.getDeltaTime();
		}
	}
	
	@Override
	public void dispose () {
		batch.dispose();
		img.dispose();
	}
}
