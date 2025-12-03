package com.example.hikeapplication.Observation;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.hikeapplication.ConnectDb;
import com.example.hikeapplication.R;

public class EditObservationActivity extends AppCompatActivity {

    private EditText observationEditText, dateObservationEditText, commentEditText;
    private Button saveButton;
    private int observationId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_observation);

        ActionBar ab = getSupportActionBar();
        if (ab != null) {
            ab.setDisplayHomeAsUpEnabled(true);
            ab.setTitle("Edit Observation");
        }

        observationEditText = findViewById(R.id.observation);
        dateObservationEditText = findViewById(R.id.dateObservation);
        commentEditText = findViewById(R.id.comment);
        saveButton = findViewById(R.id.saveObservation);

        observationId = getIntent().getIntExtra("observation_id", -1);
        String obsName = getIntent().getStringExtra("name");
        String obsTime = getIntent().getStringExtra("time");
        String obsComment = getIntent().getStringExtra("comment");

        if (observationId == -1) {
            Toast.makeText(this, "Observation ID not found!", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        observationEditText.setText(obsName);
        dateObservationEditText.setText(obsTime);
        commentEditText.setText(obsComment);

        saveButton.setOnClickListener(v -> saveObservation());
    }

    private void saveObservation() {
        String obsText = observationEditText.getText().toString().trim();
        String timeText = dateObservationEditText.getText().toString().trim();
        String commentText = commentEditText.getText().toString().trim();

        if (obsText.isEmpty() || timeText.isEmpty() || commentText.isEmpty()) {
            new AlertDialog.Builder(this)
                    .setTitle("Error")
                    .setMessage("All fields required!")
                    .setPositiveButton("OK", null)
                    .show();
            return;
        }

        new AlertDialog.Builder(this)
                .setTitle("Confirmation")
                .setMessage("Update this observation?")
                .setPositiveButton("OK", (dialog, which) -> {
                    ConnectDb db = new ConnectDb(EditObservationActivity.this);
                    db.editObservation(
                            String.valueOf(observationId),
                            obsText,
                            timeText,
                            commentText
                    );
                    Toast.makeText(EditObservationActivity.this, "Observation updated!", Toast.LENGTH_SHORT).show();
                    finish();
                })
                .setNegativeButton("Cancel", null)
                .show();
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            finish();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
