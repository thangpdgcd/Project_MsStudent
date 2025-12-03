package com.example.hikeapplication.Observation;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.Toast;

import com.example.hikeapplication.ConnectDb;
import com.example.hikeapplication.R;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.ArrayList;
import java.util.List;

public class ObservationsActivity extends AppCompatActivity {

    private Button add_btn;
    private RecyclerView recyclerView;
    private int hike_id = -1;
    private ConnectDb db;
    private List<Observation> observationList;
    private ObservationAdapter observationAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_observations);

        ActionBar ab = getSupportActionBar();
        if (ab != null) {
            ab.setDisplayHomeAsUpEnabled(true);
            ab.setTitle("Observations");
        }

        hike_id = getIntent().getIntExtra("hike_id", -1);
        if (hike_id == -1) {
            Toast.makeText(this, "Hike ID not found!", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        recyclerView = findViewById(R.id.recyclerView);
        add_btn = findViewById(R.id.add_button);
        db = new ConnectDb(this);
        observationList = new ArrayList<>();

        loadObservations();

        observationAdapter = new ObservationAdapter(this, this, observationList);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(observationAdapter);

        add_btn.setOnClickListener(view -> {
            Intent addIntent = new Intent(ObservationsActivity.this, AddObservationsActivity.class);
            addIntent.putExtra("hike_id", hike_id);
            startActivity(addIntent);
        });

        BottomNavigationView bottomNav = findViewById(R.id.bottom_nav);
        bottomNav.setSelectedItemId(R.id.home);

        bottomNav.setOnItemSelectedListener(item -> {
            int id = item.getItemId();
            if (id == R.id.add) {
                Intent addIntent = new Intent(ObservationsActivity.this, AddObservationsActivity.class);
                addIntent.putExtra("hike_id", hike_id);
                startActivity(addIntent);
                return true;
            } else if (id == R.id.home) {
                Intent homeIntent =
                        new Intent(ObservationsActivity.this,
                                com.example.hikeapplication.MainActivity.class);
                homeIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                startActivity(homeIntent);
                return true;
            } else if (id == R.id.search) {
                Intent searchIntent =
                        new Intent(ObservationsActivity.this,
                                com.example.hikeapplication.MainActivity.class);
                searchIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                startActivity(searchIntent);
                return true;
            }
            return false;
        });
    }

    private void loadObservations() {
        observationList.clear();
        List<Observation> data = db.getObservation(hike_id);
        if (data != null && !data.isEmpty()) {
            observationList.addAll(data);
        } else {
            Toast.makeText(this, "No observations found", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            finish();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onResume() {
        super.onResume();
        loadObservations();
        if (observationAdapter != null) {
            observationAdapter.notifyDataSetChanged();
        }
    }
}
